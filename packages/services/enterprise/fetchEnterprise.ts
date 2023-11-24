import { api } from "../api";

export async function fetchEnterprise() {
	const response = await api.get("/enterprise");
	return response.data;
}
