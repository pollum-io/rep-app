import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { OpportunitiesContainer } from "../../container";
import { UserLogin } from "../../dtos/IUserLogin";
import { fetchGetInvestorPFById } from "../../services";
import { fetchGetInvestorPJById } from "../../services/fetchGetInvestorPJById";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";

interface IOpportunities {
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF: UserDataPF;
	userDataPJ: UserDataPJ;
}

const Opportunities: NextPage<IOpportunities> = ({
	token,
	userDataPF,
	userDataPJ,
	investor_pf,
	investor_pj,
}) => (
	<OpportunitiesContainer
		token={token}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
		investor_pf={investor_pf}
		investor_pj={investor_pj}
	/>
);

export default Opportunities;

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
		const response = await fetchGetInvestorPFById(user?.investor_pf, token);

		return {
			props: {
				investor_pf: user?.investor_pf,
				userDataPF: response?.data,
				token: token,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(String(user?.investor_pj));

		return {
			props: {
				investor_pj: user?.investor_pj,
				userDataPJ: response?.data,
				token: token,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
};
