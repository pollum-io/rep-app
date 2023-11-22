import { api } from "../api";

export async function fetchEnterpriseInvestment(enterpriseId?: string) {
	const response = await api.get(`/enterprise/${enterpriseId}`);
	return response.data;
}
