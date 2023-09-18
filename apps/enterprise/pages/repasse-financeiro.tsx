import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { FinancialDisbursementContainer } from "../container/FinancialDisbursement";
import { fetchGetInvestorPFById } from "services";

const FinancialDisbursement: NextPage = () => (
	<FinancialDisbursementContainer />
);

export default FinancialDisbursement;

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
