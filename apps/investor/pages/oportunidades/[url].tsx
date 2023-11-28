import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { ImovelContainer } from "../../container/Imovel/index";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { UserLogin } from "../../dtos/IUserLogin";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { fetchImovelDetail } from "services";

interface IImovelProps {
	data: IOpportunitiesCard;
	users: UserLogin;
	token: string;
}

const Imovel: NextPage<IImovelProps> = ({ data, users, token }) => {
	return <ImovelContainer imovel={data} usersId={users} token={token} />;
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
			users: user,
			token,
		},
	};
};

export default Imovel;
