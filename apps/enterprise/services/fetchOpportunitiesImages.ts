import { api } from "./api";

export async function fetchImages(url: string) {
	const response = await api.get(`/file/${url}`);
	return response.data.url;
}
