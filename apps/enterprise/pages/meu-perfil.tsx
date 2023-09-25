import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { MyProfileContainer } from "../container/MyProfile";
import { fetchEnterpriseById } from "services";
import { UserLogin } from "ui";

interface IMyProfilePage {
	token: string;
	enterpriseId: string;
}

const MyProfile: NextPage<IMyProfilePage> = ({ token, enterpriseId }) => (
	<MyProfileContainer enterpriseId={enterpriseId} token={token} />
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

	if (!user?.enterprise) {
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

	if (user?.enterprise) {
		const response = await fetchEnterpriseById(String(user?.enterprise), token);

		return {
			props: {
				enterpriseId: user?.enterprise,
				enterpriseData: response,
				token: token,
			},
		};
	}
};

export default MyProfile;
