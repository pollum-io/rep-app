import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { CompaniesContainer } from "../../container";
import { UserLogin } from "../../dtos/IUserLogin";
import { ICompanieData } from "../../dtos/ICompaniesData";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { fetchEnterprise } from "services";

interface ICompanies {
	companies: ICompanieData[];
	token?: string;
	user: UserInfo;
}

const Companies: NextPage<ICompanies> = ({ companies, user, token }) => (
	<CompaniesContainer data={companies} token={token} user={user} />
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
			companies: requestAllCompanies?.enterprises,
		},
	};
};
