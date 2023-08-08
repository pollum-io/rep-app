import jwt_decode from "jwt-decode";
import { LoginContainer } from "../container";
import type { GetServerSideProps, NextPage } from "next";
import { UserLogin } from "../dtos/IUserLogin";

const Login: NextPage = () => <LoginContainer />;

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["livn_auth"];
	let user: UserLogin;
	console.log(user, "user");
	console.log(token, "token");

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
						!user?.investor_pf && !user?.investor_pj
							? "/registrar"
							: "/oportunidades",
				},
				props: { user, token },
		  };
};
