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
	console.log(token, "tokenopp");

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
	console.log(user, "user");

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
		const response = await fetchGetInvestorPFById(user?.investor_pf);

		console.log(response);
		return {
			props: {
				user,
				userDataPF: null,
			},
		};
	} else if (user?.investor_pj) {
		const response = await fetchGetInvestorPJById(String(user?.investor_pj));

		return {
			props: {
				user,
				userDataPJ: response,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
};
