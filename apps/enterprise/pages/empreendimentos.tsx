import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { EmpreendimentosContainer } from "../container/Empreendimentos";
import { fetchGetInvestorPFById } from "services";
import { UserLogin } from "ui";

interface IPage {
	token: string;
	investor_pf: string;
}

const Empreendimentos: NextPage<IPage> = ({ token, investor_pf }) => (
	<EmpreendimentosContainer token={token} investor_pf={investor_pf} />
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

export default Empreendimentos;
