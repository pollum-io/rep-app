import { apiInstance } from "./api";

export const fetchGetInvestorPFById = async (
	investor_pf: string,
	token?: string,
	host?: string
) => {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/investorPF/${investor_pf}`, {
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
