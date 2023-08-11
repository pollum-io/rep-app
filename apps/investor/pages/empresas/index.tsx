import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { CompaniesContainer } from "../../container";
import { fetchEnterprise } from "../../services/fetchEnterprise";
import { UserLogin } from "../../dtos/IUserLogin";
import { ICompanieData } from "../../dtos/ICompaniesData";
import { UserInfo } from "../../dtos/GlobalUserInfo";

interface ICompanies {
	companies: ICompanieData[];
	user: UserInfo;
}

const Companies: NextPage<ICompanies> = ({ companies, user }) => (
	<CompaniesContainer data={companies} user={user} />
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

	if (!user?.investor_pf && !user?.investor_pj) {
		return {
			redirect: {
				permanent: false,
				destination: "/registrar",
			},
			props: {},
		};
	}

	const requestAllCompanies = await fetchEnterprise();

	return {
		props: {
			user,
			token,
			companies: requestAllCompanies.data,
		},
	};
};
