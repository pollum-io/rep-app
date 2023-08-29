import { api } from "./api";

export async function fetchInvestmentByUser(token: string) {
	try {
		const response = await api.get(`/investment`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.error(error);
	}
}
