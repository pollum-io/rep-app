// import jwt_decode from "jwt-decode";
// import type { GetServerSideProps, NextPage } from "next";
// import { PortfolioContainer } from "../container";
// import { fetchEnterpriseInvestment } from "../services/fetchEnterpriseInvestmet";
// import { fetchGetInvestment } from "../services/fetchGetInvestment";
// import { fetchOpportunitiesByCompanyPortfolio } from "../services/fetchOpportunitiesByCompanyPortfolio";

// interface IPortfolio {
// 	data?: string;
// 	enterpriseData?: string;
// 	enterpriseInvestment?: string;
// 	host?: string;
// 	user?: string;
// }

// const Portfolio: NextPage<IPortfolio> = ({
// 	data,
// 	enterpriseData,
// 	enterpriseInvestment,
// 	host,
// 	user,
// }) => (
// 	<PortfolioContainer
// 		portfolioData={data}
// 		enterpriseData={enterpriseData?.data}
// 		enterpriseInvestment={enterpriseInvestment}
// 		host={host}
// 		user={user}
// 	/>
// );

// export default Portfolio;

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
// 	const token = req.cookies["livn_auth"];

// 	if (!token) {
// 		return {
// 			redirect: {
// 				permanent: false,
// 				destination: "/",
// 			},
// 			props: {},
// 		};
// 	}

// 	const user: string = jwt_decode(token);
// 	const host = req.headers.host;

// 	if (!user?.investor_pf && !user?.investor_pj) {
// 		return {
// 			redirect: {
// 				permanent: false,
// 				destination: "/registrar",
// 			},
// 			props: {},
// 		};
// 	}

// 	if (user?.investor_pj && host) {
// 		const response = await fetchOpportunitiesByCompanyPortfolio(
// 			user.investor_pj,
// 			host
// 		);

// 		const investment = await fetchEnterpriseInvestment(host, user?.investor_pj);

// 		return {
// 			props: {
// 				user,
// 				token,
// 				host,
// 				enterpriseData: response?.data,
// 				enterpriseInvestment: investment?.data,
// 			},
// 		};
// 	}

// 	const response = await fetchGetInvestment(user?.investor_pf, token, host);

// 	return {
// 		props: {
// 			user,
// 			token,
// 			host,
// 			data: response?.data,
// 		},
// 	};
// };
