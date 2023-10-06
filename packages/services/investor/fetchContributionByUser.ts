import { api } from "../api";

export async function fetchContributionByUser(token: string, id: string) {
	try {
		const response = await api.get(`/contribution/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
}
