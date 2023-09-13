import { api } from "./api";

export async function fetchGetInvestmentDetailByUser(
	token: string,
	id: string
) {
	try {
		const response = await api.get(`/investment_detail/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response?.data;
	} catch (error) {
		console.error(error);
	}
}
