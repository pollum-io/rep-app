import { apiInstance } from "./api";

export async function fetchEnterprise(host?: string) {
	const api = apiInstance(host);

	const response = await api.get("/enterprise");
	return response.data;
}
