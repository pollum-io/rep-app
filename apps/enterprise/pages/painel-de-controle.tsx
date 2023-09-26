import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserDataPF, UserLogin } from "ui";
import { DashboardContainer } from "../container/Dashboard";
import {
	fetchEnterpriseById,
	fetchEnterpriseForecastGeneral,
	fetchEnterpriseForecastMonthly,
} from "services";
interface IDashboardPage {
	token: string;
	enterpriseData: UserDataPF;
	enterpriseId: string;
	monthlyForecastResponse: any;
	generalForecastResponse: any;
}

const Dashboard: NextPage<IDashboardPage> = ({
	token,
	enterpriseData,
	enterpriseId,
	monthlyForecastResponse,
	generalForecastResponse,
}) => (
	<DashboardContainer
		token={token}
		enterpriseId={enterpriseId}
		enterpriseData={enterpriseData}
		monthlyForecast={monthlyForecastResponse}
		generalForecast={generalForecastResponse}
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
		const monthlyForecastResponse = await fetchEnterpriseForecastMonthly(
			String(user?.enterprise),
			token
		);
		const generalForecastResponse = await fetchEnterpriseForecastGeneral(
			String(user?.enterprise),
			token
		);

		return {
			props: {
				enterpriseId: user?.enterprise,
				enterpriseData: response,
				monthlyForecastResponse,
				generalForecastResponse,
				token: token,
			},
		};
	}
};

export default Dashboard;
