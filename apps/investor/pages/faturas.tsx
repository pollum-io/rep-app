import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "../dtos/IUserLogin";
import { FaturasContainer } from "../container/Faturas";
import { UserDataPF } from "../dtos/UserPF";
import { UserDataPJ } from "../dtos/UserPJ";
import { UserInfo } from "../dtos/GlobalUserInfo";
import { InvestmentModel } from "../dtos/IInvestment";
import { IContribution } from "ui";
import {
	fetchContributionByUser,
	fetchGetInvestorPFById,
	fetchGetInvestorPJById,
	fetchInvestmentByUser,
} from "services";

interface UserData {
	token: string;
	user: UserLogin;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	investments?: InvestmentModel[];
	contribution?: IContribution;
}

const Faturas: NextPage<UserData> = ({
	token,
	user,
	userDataPF,
	userDataPJ,
	investments,
	contribution,
}) => (
	<FaturasContainer
		token={token}
		user={user}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
		investments={investments}
		contribution={contribution}
	/>
);

export default Faturas;

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
			props: {
				user,
				token,
			},
		};
	}
	const investments = await fetchInvestmentByUser(token);

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(user?.investor_pf, token);
		const contribution = await fetchContributionByUser(
			token,
			user?.investor_pf
		);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
				investments: investments?.investments,
				contribution,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(
			String(user?.investor_pj),
			token
		);
		const contribution = await fetchContributionByUser(
			token,
			user?.investor_pj
		);
		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
				investments,
				contribution,
			},
		};
	}

	return {
		props: {
			user,
			token,
		},
	};
};
