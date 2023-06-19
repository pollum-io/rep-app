import { apiInstance } from "./api";

export async function fetchImovelDetail(id: any, host?: string) {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/opportunity/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
