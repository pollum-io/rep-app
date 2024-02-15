import { api } from "../api";

export const fetchCreateEnterprise = async (data: unknown) => {
	try {
		const response = await api.post(`/enterprise`, data);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
