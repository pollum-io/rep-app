import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { ImovelContainer } from "../../container/Imovel/index";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { fetchImovelDetail } from "../../services/fetchImovelDetail";

interface IImovelProps {
	data: IOpportunitiesCard;
	users: any;
}

const Imovel: NextPage<IImovelProps> = ({ data, users }) => {
	return <ImovelContainer imovel={data} usersId={users} />;
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

	const user: any = jwt_decode(token);
	const host = req.headers.host;

	const response = await fetchImovelDetail(query.id, host);

	return {
		props: {
			data: response?.data,
			users: user,
		},
	};
};

export default Imovel;
