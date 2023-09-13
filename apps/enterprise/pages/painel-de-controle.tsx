import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserDataPF, UserDataPJ, UserLogin } from "ui";
import { DashboardContainer } from "../container/Dashboard";
import { fetchGetInvestorPFById } from "services";
interface IDashboardPage {
	token: string;
	userDataPJ: UserDataPF;
	investorPjId: string;
}

const Dashboard: NextPage<IDashboardPage> = ({
	token,
	userDataPJ,
	investorPjId,
}) => (
	<DashboardContainer
		token={token}
		investorPjId={investorPjId}
		userDataPJ={userDataPJ}
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

	if (!user?.investor_pf) {
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

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(
			String(user?.investor_pf),
			token
		);

		return {
			props: {
				investorPjId: user?.investor_pf,
				userDataPJ: response?.data,
				token: token,
			},
		};
	}
};

export default Dashboard;
