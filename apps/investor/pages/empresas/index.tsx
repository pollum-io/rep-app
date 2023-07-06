import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { CompaniesContainer } from "../../container";
import { fetchEnterprise } from "../../services/fetchEnterprise";
import { UserLogin } from "../../dtos/IUserLogin";
import { ICompanieData } from "../../dtos/ICompaniesData";

interface ICompanies {
	companies: ICompanieData[];
}

const Companies: NextPage<ICompanies> = ({ companies }) => (
	<CompaniesContainer data={companies} />
);

export default Companies;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

	const user: UserLogin = jwt_decode(token);
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
