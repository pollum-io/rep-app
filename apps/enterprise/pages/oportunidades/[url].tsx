import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { fetchEnterpriseDetail, fetchImovelDetail } from "services";
import { UserLogin } from "ui";
import { ImovelContainer } from "../../container/Imovel";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";

interface IImovelProps {
	data: IOpportunitiesCard;
	opportuntyDetailsToEnterprise: unknown;
	user: UserLogin;
	token: string;
}

const Imovel: NextPage<IImovelProps> = ({
	data,
	opportuntyDetailsToEnterprise,
	user,
	token,
}) => {
	return (
		<ImovelContainer
			imovel={data}
			opportuntyDetails={opportuntyDetailsToEnterprise}
			user={user}
			token={token}
		/>
	);
};
export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const token = req.cookies["inc_auth"];

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
	const opportuntyDetailsToEnterprise = await fetchEnterpriseDetail(
		response?._id,
		token
	);
	return {
		props: {
			data: response,
			opportuntyDetailsToEnterprise,
			user: user,
			token,
		},
	};
};

export default Imovel;
