import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { AccountsContainer } from "../container/Accounts";
import { UserLogin } from "ui";

// interface IPage {
// 	example: string;
// }

const Accounts: NextPage = () => <AccountsContainer />;

export default Accounts;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const token = req.cookies["adm_auth"];

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

	if (!user?.admin) {
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

	return {
		props: {
			token: token,
		},
	};
};
