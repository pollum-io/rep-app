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

interface IPayment {
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	imovel?: IOpportunitiesCard;
	enterprise?: ICompaniesDetails;
}

const Pagamento: NextPage<IPayment> = ({
	imovel,
	token,
	userDataPF,
	userDataPJ,
	investor_pf,
	investor_pj,
	enterprise,
}) => (
	<PaymentContainer
		imovel={imovel}
		token={token}
		userDataPF={userDataPF}
		userDataPJ={userDataPJ}
		investor_pf={investor_pf}
		investor_pj={investor_pj}
		enterprise={enterprise}
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
	const imovel = await fetchImovelDetail(String(query?.id));
	const enterprise = await fetchEnterpriseById(String(imovel?.enterprise_id));

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(user?.investor_pf, token);

		return {
			props: {
				investor_pf: user?.investor_pf,
				userDataPF: response?.data,
				token: token,
				imovel,
				enterprise,
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
				imovel,
				enterprise,
			},
		};
	}
};
