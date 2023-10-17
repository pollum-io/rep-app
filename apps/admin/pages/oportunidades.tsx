import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { OpportunitiesControllContainer } from "../container/OpportunitiesControll";
import { UserLogin } from "ui";

// interface IPage {
// 	example: string;
// }

const Opportunities: NextPage = () => <OpportunitiesControllContainer />;

export default Opportunities;

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
