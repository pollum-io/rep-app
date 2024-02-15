import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { FinancialDisbursementContainer } from "../container/FinancialDisbursement";
import { fetchEnterpriseById } from "services";

interface IFinancialDisbursementPage {
	token: string;
	enterpriseData: unknown;
	enterpriseId: string;
}

const FinancialDisbursement: NextPage<IFinancialDisbursementPage> = ({
	token,
	enterpriseData,
	enterpriseId,
}) => (
	<FinancialDisbursementContainer
		token={token}
		enterpriseId={enterpriseId}
		enterpriseData={enterpriseData}
	/>
);

export default FinancialDisbursement;

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
