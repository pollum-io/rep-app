import { GetServerSideProps, NextPage } from "next";
import { DashboardPage } from "../components/pages/Dashboard";
import jwt_decode from "jwt-decode";
import { UserLogin } from "../dtos/IUserLogin";

const Dashboard: NextPage = () => <DashboardPage />;

export default Dashboard;

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
				destination: "/",
			},
			props: {},
		};
	}

	return {
		props: {
			user,
			token,
		},
	};
};
