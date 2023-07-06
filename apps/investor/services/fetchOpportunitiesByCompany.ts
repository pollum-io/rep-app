import qs from "qs";
import { apiInstance } from "./api";

export const fetchOpportunitiesByCompany = async (
	query: object,
	host?: string
) => {
	const api = apiInstance(host);
	const params = query ? `?${qs.stringify(query)}` : "";

	const response = await api.get(`/opportunity${params}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});

	return response.data;
};
