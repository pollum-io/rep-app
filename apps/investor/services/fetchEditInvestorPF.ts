import { apiInstance } from "./api";

export const fetchEditInvestorPF = async (
	investor_pf: any,
	data: any,
	token: any
) => {
	try {
		const api = apiInstance();
		const response = await api.put(`/investorPF/${investor_pf}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
};
