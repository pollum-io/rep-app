import jwt_decode from "jwt-decode";
import { LoginContainer } from "../container";
import type { GetServerSideProps, NextPage } from "next";

type UserLogin = {
	investor_pf?: string;
	investor_pj: string;
};

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
		console.log(user, "user");
	} catch (error) {
		user = null;
	}

	return !user
		? { props: {} }
		: {
				redirect: {
					permanent: false,
					destination:
						!user?.investor_pf && !user?.investor_pj
							? "/registrar"
							: "/oportunidades",
				},
				props: { user, token },
		  };
};
