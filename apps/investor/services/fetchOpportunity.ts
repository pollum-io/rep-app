import qs from "qs";
import { apiInstance } from "./api";

export const fetchOpportunity = async (query?: object, host?: string) => {
	const api = apiInstance(host);
	const params = query ? `?${qs.stringify(query)}` : "";

	const response = await api.get(`/opportunity${params}`);

	return response.data;
};
