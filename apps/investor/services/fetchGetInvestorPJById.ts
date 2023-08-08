import { api } from "./api";

export const fetchGetInvestorPJById = async (investor_pj: string) => {
	try {
		const response = await api.get(`/investorPJ/${investor_pj}`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
