import { api } from "./api";

export const fetchGetInvestorPFById = async (investor_pf: string) => {
	try {
		const response = await api.get(`/investor/pf/${investor_pf}`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
