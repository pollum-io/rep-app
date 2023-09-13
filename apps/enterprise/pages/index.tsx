import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "ui";
import { LoginContainer } from "../container/Login";

const Login: NextPage = () => <LoginContainer />;

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["livn_auth"];
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
					destination:
						!user?.investor_pf || !user?.investor_pj
							? "/"
							: "/painel-de-controle",
				},
				props: { user, token },
		  };
};
