import { GetServerSideProps, NextPage } from "next";
import jwt_decode from "jwt-decode";
import { UserLogin } from "ui";
import { RegisterContainer } from "../container/Register";

const Registrar: NextPage = (props) => <RegisterContainer {...props} />;

export default Registrar;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

	if (!user?.investor_pf && !user?.investor_pj) {
		return {
			props: { user, token },
		};
	}

	return {
		redirect: {
			permanent: false,
			destination: "/painel-de-controle",
		},
		props: { user, token },
	};
};
