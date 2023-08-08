import { api } from "./api";

export const fetchOpportunitiesByCompanyPortfolio = async (
	enterpriseId: string
) => {
	const request = await api.get(`/opportunity?investor_pj=${enterpriseId}`);

	return request;
};
