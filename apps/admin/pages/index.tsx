import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { LoginContainer } from "../container/Login";

interface ILogin {
	token: string;
}

const Login: NextPage<ILogin> = ({ token }) => <LoginContainer token={token} />;

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["adm_auth"];
	let user: UserLogin;

	if (!token) {
		return { props: {} };
	}
	try {
		user = jwt_decode(token);
	} catch (error) {
		user = null;
	}
	return !user
		? { props: {} }
		: {
				redirect: {
					permanent: false,
					destination: !user?.admin ? "/" : "/painel-geral",
				},
				props: { user, token },
		  };
};
