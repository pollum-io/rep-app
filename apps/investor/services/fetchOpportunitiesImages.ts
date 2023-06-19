import { apiInstance } from "./api";

export async function fetchImages(url: string) {
	const api = apiInstance();
	const response = await api.get(`/file/${url}`);
	return response.data.url;
}
