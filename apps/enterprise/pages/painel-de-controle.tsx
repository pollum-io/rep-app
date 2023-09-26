import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserDataPF, UserLogin } from "ui";
import { DashboardContainer } from "../container/Dashboard";
import {
	fetchEnterpriseById,
	fetchEnterpriseForecastGeneral,
	fetchEnterpriseForecastMonthly,
	fetchEnterpriseShareholders,
} from "services";
import { IMonthlyForecast } from "../types/IMonthlyForecast";
import { IGeneralForecast } from "../types/IGeneralForecast";
import { IShareholder } from "../types/IShareholders";
interface IDashboardPage {
	token: string;
	enterpriseId: string;
	monthlyForecastResponse: IMonthlyForecast;
	generalForecastResponse: IGeneralForecast;
	shareholdersResponse: IShareholder[];
}

const Dashboard: NextPage<IDashboardPage> = ({
	token,
	enterpriseId,
	monthlyForecastResponse,
	generalForecastResponse,
	shareholdersResponse,
}) => (
	<DashboardContainer
		token={token}
		enterpriseId={enterpriseId}
		monthlyForecast={monthlyForecastResponse}
		generalForecast={generalForecastResponse}
		shareholders={shareholdersResponse}
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
		const monthlyForecastResponse = await fetchEnterpriseForecastMonthly(
			String(user?.enterprise),
			token
		);
		const generalForecastResponse = await fetchEnterpriseForecastGeneral(
			String(user?.enterprise),
			token
		);
		const shareholdersResponse = await fetchEnterpriseShareholders(
			String(user?.enterprise),
			token
		);

		return {
			props: {
				enterpriseId: user?.enterprise,
				monthlyForecastResponse,
				generalForecastResponse,
				shareholdersResponse,
				token: token,
			},
		};
	}
};

export default Dashboard;
