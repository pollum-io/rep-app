import { GetServerSideProps, NextPage } from "next";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";
import { CompanieContainer } from "../../container";
import { UserLogin } from "../../dtos/IUserLogin";
import jwt_decode from "jwt-decode";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { fetchEnterpriseById } from "services";

interface ICompanieProps {
	data: ICompaniesDetails;
	user: UserInfo;
	token: string;
}

const Companie: NextPage<ICompanieProps> = ({ data, user, token }) => {
	return <CompanieContainer data={data} user={user} token={token} />;
};

export default Companie;

export const getServerSideProps: GetServerSideProps = async ({
	query,
	req,
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
	const response = await fetchEnterpriseById(String(query.enterprise_id));

	return {
		props: {
			data: response,
			user,
			token,
		},
	};
};
