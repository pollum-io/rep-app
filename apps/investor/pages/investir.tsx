import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { InvestContainer } from "../container";
import { IOpportunitiesCard } from "../dtos/Oportunities";
import { fetchImovelDetail } from "../services/fetchImovelDetail";
import { UserLogin } from "../dtos/IUserLogin";

interface IInvest {
	data: IOpportunitiesCard;
	cotas: number;
	address: string;
	token: string;
}

const Investir: NextPage<IInvest> = ({ data, cotas, address, token }) => (
	<InvestContainer
		data={data}
		cotas={cotas}
		oportunitiesAddress={address}
		token={token}
	/>
);

export default Investir;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const token = req.cookies["livn_auth"];
	const response = await fetchImovelDetail(String(query.id));
	const cotas = query.cotas;
	const address = query.oportunitiesAddress;

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

	return {
		props: {
			user,
			token,
			data: response.data,
			cotas,
			address,
		},
	};
};
