import { api } from "../api";

export const fetchGetInvestment = async (investor_pf: string) => {
	try {
		const response = await api.get(`/investment/${investor_pf}`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
