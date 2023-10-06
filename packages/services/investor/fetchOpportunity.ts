import qs from "qs";
import { api } from "../api";

export const fetchOpportunity = async (query?: object) => {
	const params = query ? `?${qs.stringify(query)}` : "";

	const response = await api.get(`/opportunity${params}`);

	return response.data;
};
