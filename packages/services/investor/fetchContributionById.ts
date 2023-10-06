import { api } from "../api";

export async function fetchContributionById(
	token: string,
	investor_id: string,
	contribution_id: string
) {
	try {
		const response = await api.get(
			`/contribution/${investor_id}/${contribution_id}
		`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
