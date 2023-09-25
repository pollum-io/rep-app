import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { fetchEnterpriseById, fetchImovelDetail } from "services";
import { UserLogin } from "ui";
import { ImovelContainer } from "../../container/Imovel";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";

interface IImovelProps {
	data: IOpportunitiesCard;
	user: UserLogin;
	token: string;
}

const Imovel: NextPage<IImovelProps> = ({ data, user, token }) => {
	return <ImovelContainer imovel={data} user={user} token={token} />;
};
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

	const response = await fetchImovelDetail(String(query?.url));

	return {
		props: {
			data: response,
			user: user,
			token,
		},
	};
};

export default Imovel;
