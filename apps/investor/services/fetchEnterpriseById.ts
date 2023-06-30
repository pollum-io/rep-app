import { apiInstance } from "./api";

export const fetchEnterpriseById = async (id: any, host?: string) => {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/enterprise/${id}`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
