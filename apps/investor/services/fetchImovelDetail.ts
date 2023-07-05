import { apiInstance } from "./api";

export async function fetchImovelDetail(id: string, host?: string) {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/opportunity/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
