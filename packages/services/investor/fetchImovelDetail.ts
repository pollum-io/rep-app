import { api } from "../api";

export async function fetchImovelDetail(url: string) {
	try {
		const response = await api.get(`/opportunity/${url}`);
		console.log(response, "porram");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
