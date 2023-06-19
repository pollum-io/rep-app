import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { CompaniesContainer } from "../../container";
import { fetchEnterprise } from "../../services/fetchEnterprise";

interface ICompanies {
	companies: any;
}

const Companies: NextPage<ICompanies> = ({ companies }) => (
	<CompaniesContainer data={companies} />
);

export default Companies;

export const getServerSideProps: GetServerSideProps = async ({
	resolvedUrl,
	req,
}) => {
	const token = req.cookies["livn_auth"];

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	const user: any = jwt_decode(token);
	const host = req.headers.host;

	if (!user?.investor_pf && !user?.investor_pj) {
		return {
			redirect: {
				permanent: false,
				destination: "/registrar",
			},
			props: {},
		};
	}

	const requestAllCompanies = await fetchEnterprise(host);

	return {
		props: {
			user,
			token,
			companies: requestAllCompanies.data,
		},
	};
};
