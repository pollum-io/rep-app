import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { Edit_ProfileContainer } from "../../container";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { UserLogin } from "../../dtos/IUserLogin";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { fetchGetInvestorPFById, fetchGetInvestorPJById } from "services";

interface IEditProfile {
	user: UserInfo;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	token: string;
}

const Editar_Perfil: NextPage<IEditProfile> = ({
	token,
	user,
	userDataPF,
	userDataPJ,
}) => (
	<Edit_ProfileContainer
		user={user}
		token={token}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
	/>
);

export default Editar_Perfil;

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

	if (!user?.investor_pf && !user?.investor_pj) {
		return {
			redirect: {
				permanent: false,
				destination: "/registrar",
			},
			props: {},
		};
	}

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(String(query.id), token);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(String(query.id), token);

		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
			},
		};
	}
};
