import { api } from "./api";

export async function fetchImovelDetail(url: string) {
	try {
		const response = await api.get(`/opportunity/${url}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
