import { api } from "./api";

export async function fetchInvestmentByUser(token: string, page?: number) {
	try {
		const response = await api.get(
			`/investment?limit=10&page=${page ? page : 1}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}
