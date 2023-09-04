import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "../dtos/IUserLogin";
import { fetchGetInvestorPFById } from "../services";
import { fetchGetInvestorPJById } from "../services/fetchGetInvestorPJById";
import { UserDataPF } from "../dtos/UserPF";
import { UserDataPJ } from "../dtos/UserPJ";
import { MeusInvestimentosContainer } from "../container/MeusInvestimentos";
import { UserInfo } from "../dtos/GlobalUserInfo";
import { fetchInvestmentByUser } from "../services/fetchInvestmentByUser";
import { InvestmentModel } from "../dtos/IInvestment";

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	investments?: InvestmentModel[];
}

const Meus_Investimentos: NextPage<UserData> = ({
	token,
	user,
	userDataPF,
	userDataPJ,
	investments,
}) => (
	<MeusInvestimentosContainer
		token={token}
		user={user}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
		investments={investments}
	/>
);

export default Meus_Investimentos;

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
	// const investments = await fetchInvestmentByUser(token);

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(user?.investor_pf, token);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
				// investments: investments?.data?.investments,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(
			String(user?.investor_pj),
			token
		);

		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
				// investments: investments?.data?.investments,
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
