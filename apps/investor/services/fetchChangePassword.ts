import { apiInstance } from "./api";

export const fetchChangePassword = async (
	code: any,
	password: any,
	host?: string
) => {
	try {
		const api = apiInstance(host);
		const response = await api.put("/changePassword", { code, password });
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
