import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { ChangeEnterprisePasswordContainer } from "../container/ChangeEnterprisePassword";

interface IChangeEnterprisePassword {
	token: string;
	user: UserLogin;
}

const ChangeEnterprisePassword: NextPage<IChangeEnterprisePassword> = ({
	token,
	user,
}) => <ChangeEnterprisePasswordContainer token={token} user={user} />;

export default ChangeEnterprisePassword;

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
		return {
			props: {
				token,
				user,
			},
		};
	}
};
