import { apiInstance } from "./api";

export const fetchGetInvestorPJById = async (
	investor_pj: any,
	token?: any,
	host?: string
) => {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/investorPJ/${investor_pj}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
