import { api } from "./api";

export async function fetchImovelDetail(id: string) {
	try {
		const response = await api.get(`/opportunity/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
