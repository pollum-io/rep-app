import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { Edit_ProfileContainer } from "../../container";
import { fetchGetInvestorPFById } from "../../services/fetchGetInvestorPFById";
import { fetchGetInvestorPJById } from "../../services/fetchGetInvestorPJById";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";

interface IEditProfile {
	userDataPF: UserDataPF;
	userDataPJ: UserDataPJ;
	token: string;
}

const Editar_Perfil: NextPage<IEditProfile> = (props) => (
	<Edit_ProfileContainer {...props} />
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

	const user: any = jwt_decode(token);
	const host = req.headers.host;

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
		const response = await fetchGetInvestorPFById(query.id, token, host);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(query.id, token, host);

		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
			},
		};
	}
};
