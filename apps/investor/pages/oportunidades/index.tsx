import jwt_decode from "jwt-decode";
import { GetServerSideProps, NextPage } from "next";
import { OpportunitiesContainer } from "../../container";
import { UserLogin } from "../../dtos/IUserLogin";
import { fetchGetInvestorPFById } from "../../services";
import { fetchGetInvestorPJById } from "../../services/fetchGetInvestorPJById";

const Opportunities: NextPage = (props) => (
	<OpportunitiesContainer {...props} />
);

export default Opportunities;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["livn_auth"];
	const host = req.headers.host;

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
			redirect: {
				permanent: false,
				destination: "/registrar",
			},
			props: {
				user,
				token,
			},
		};
	}

	if (user?.investor_pf) {
		const response = await fetchGetInvestorPFById(
			user?.investor_pf,
			token,
			host
		);

		return {
			props: {
				user,
				token,
				userDataPF: response?.data,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(
			String(user?.investor_pj),
			token,
			host
		);

		return {
			props: {
				user,
				token,
				userDataPJ: response?.data,
			},
		};
	}

	return {
		props: {
			user,
			token,
		},
	};
};
