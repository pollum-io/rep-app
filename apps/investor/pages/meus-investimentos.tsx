import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "../dtos/IUserLogin";
import { fetchGetInvestorPFById } from "../services";
import { fetchGetInvestorPJById } from "../services/fetchGetInvestorPJById";
import { UserDataPF } from "../dtos/UserPF";
import { UserDataPJ } from "../dtos/UserPJ";
import { MeusInvestimentosContainer } from "../container/MeusInvestimentos";
import { UserInfo } from "../dtos/GlobalUserInfo";

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF: UserDataPF;
	userDataPJ: UserDataPJ;
}

const Meus_Investimentos: NextPage<UserData> = (props) => (
	<MeusInvestimentosContainer {...props} />
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

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(user?.investor_pf);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(String(user?.investor_pj));

		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
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
