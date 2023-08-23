import qs from "qs";
import { api } from "./api";

export const fetchOpportunitiesByCompany = async (query: object) => {
	const params = query ? `?${qs.stringify(query)}` : "";

	const response = await api.get(`/opportunity${params}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	console.log(response, "response");
	return response.data;
};
