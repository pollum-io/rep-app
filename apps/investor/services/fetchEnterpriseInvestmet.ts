import { apiInstance } from "./api";

export async function fetchEnterpriseInvestment(
	host?: string,
	enterpriseId?: string
) {
	const api = apiInstance(host);

	const response = await api.get(`/enterprise/${enterpriseId}`);
	return response.data;
}
