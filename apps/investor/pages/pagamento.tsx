import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { IOpportunitiesCard } from "../dtos/Oportunities";
import { fetchImovelDetail } from "../services/fetchImovelDetail";
import { UserLogin } from "../dtos/IUserLogin";
import {
	fetchEnterpriseById,
	fetchGetInvestorPFById,
	fetchGetInvestorPJById,
} from "../services";
import { UserDataPF } from "../dtos/UserPF";
import { UserDataPJ } from "../dtos/UserPJ";
import { ICompaniesDetails } from "../components/Companies/CompaniesCard/dto";
import { PaymentContainer } from "../container/Payment";
import { fetchGetPayment } from "../services/fetchGetPayment";

interface IPayment {
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	imovelPayment?: any;
}

const Pagamento: NextPage<IPayment> = ({
	imovelPayment,
	token,
	userDataPF,
	userDataPJ,
	investor_pf,
	investor_pj,
}) => (
	<PaymentContainer
		imovelPayment={imovelPayment}
		token={token}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
		investor_pf={investor_pf}
		investor_pj={investor_pj}
	/>
);

export default Pagamento;

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
	const imovelPayment = await fetchGetPayment(String(query?.id), token);
	console.log(imovelPayment, "aaaaaaaaaaaa");
	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(user?.investor_pf, token);

		return {
			props: {
				investor_pf: user?.investor_pf,
				userDataPF: response?.data,
				token: token,
				imovelPayment,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(
			String(user?.investor_pj),
			token
		);

		return {
			props: {
				investor_pj: user?.investor_pj,
				userDataPJ: response?.data,
				token: token,
				imovelPayment,
			},
		};
	}
};
