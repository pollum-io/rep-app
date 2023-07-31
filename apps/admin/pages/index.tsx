import { GetServerSideProps, NextPage } from "next";
import { LoginPage } from "../components/pages/Login";
import { UserLogin } from "../dtos/IUserLogin";
import jwt_decode from "jwt-decode";

const Login: NextPage = () => <LoginPage />;

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
						!user?.investor_pf && !user?.investor_pj ? "/" : "/pagina_inicial",
				},
				props: { user, token },
		  };
};
