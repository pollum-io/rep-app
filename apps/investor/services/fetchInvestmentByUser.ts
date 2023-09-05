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
		const { investments, total_pages } = response.data; // Assuming your API response contains total_pages
		return { investments, totalPages: total_pages };
	} catch (error) {
		console.error(error);
	}
}
