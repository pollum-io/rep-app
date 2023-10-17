import { api } from "../api";

export const fetchUpdateEnterprise = async (data: any, id: string) => {
	try {
		const response = await api.put(`/enterprise/${id}`, data);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
