import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserDataPF, UserDataPJ, UserLogin } from "ui";
import { DashboardContainer } from "../container/Dashboard";
import { fetchEnterpriseById, fetchGetInvestorPFById } from "services";
interface IDashboardPage {
	token: string;
	enterpriseData: UserDataPF;
	enterpriseId: string;
}

const Dashboard: NextPage<IDashboardPage> = ({
	token,
	enterpriseData,
	enterpriseId,
}) => (
	<DashboardContainer
		token={token}
		enterpriseId={enterpriseId}
		enterpriseData={enterpriseData}
	/>
);

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
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

	const user: UserLogin = jwt_decode(token);

	if (!user?.enterprise) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {
				user,
				token,
			},
		};
	}

	if (user?.enterprise) {
		const response = await fetchEnterpriseById(String(user?.enterprise), token);

		return {
			props: {
				enterpriseId: user?.enterprise,
				enterpriseData: response,
				token: token,
			},
		};
	}
};

export default Dashboard;
