import { GetServerSideProps, NextPage } from "next";
import { RegisterContainer } from "../container";
import jwt_decode from "jwt-decode";

const Registrar: NextPage = (props) => <RegisterContainer {...props} />;

export default Registrar;

type UserLogin = {
	investor_pf?: string;
	investor_pj: string;
};

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
			destination: "/oportunidades",
		},
		props: { user, token },
	};
};
