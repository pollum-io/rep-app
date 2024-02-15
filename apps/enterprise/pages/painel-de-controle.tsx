import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { DashboardContainer } from "../container/Dashboard";
import {
	fetchEnterpriseForecastGeneral,
	fetchEnterpriseForecastMonthly,
} from "services";
import { IMonthlyForecast } from "../types/IMonthlyForecast";
import { IGeneralForecast } from "../types/IGeneralForecast";
interface IDashboardPage {
	token: string;
	enterpriseId: string;
	monthlyForecastResponse: IMonthlyForecast;
	generalForecastResponse: IGeneralForecast;
}

const Dashboard: NextPage<IDashboardPage> = ({
	token,
	enterpriseId,
	monthlyForecastResponse,
	generalForecastResponse,
}) => (
	<DashboardContainer
		token={token}
		enterpriseId={enterpriseId}
		monthlyForecast={monthlyForecastResponse}
		generalForecast={generalForecastResponse}
	/>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["inc_auth"];

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
		const monthlyForecastResponse = await fetchEnterpriseForecastMonthly(
			String(user?.enterprise),
			token
		);
		const generalForecastResponse = await fetchEnterpriseForecastGeneral(
			String(user?.enterprise),
			token
		);
		console.log(generalForecastResponse, "generalForecastResponse");
		return {
			props: {
				enterpriseId: user?.enterprise,
				monthlyForecastResponse,
				generalForecastResponse,
				token: token,
			},
		};
	}
};

export default Dashboard;
