import jwt_decode from "jwt-decode";
import { LoginContainer } from "../container";
import type { GetServerSideProps, NextPage } from "next";

const Login: NextPage = () => <LoginContainer />;

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["livn_auth"];
	let user: any;

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
						!user?.investor_id && !user?.enterprise_id
							? "/registrar"
							: "/portfolio",
				},
				props: { user, token },
		  };
};
