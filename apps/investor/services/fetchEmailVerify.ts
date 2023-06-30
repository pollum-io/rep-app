import { apiInstance } from "./api";

export const fetchEmailVerify = async (email?: any, host?: string) => {
	try {
		console.log(email, "email");

		const api = apiInstance(host);
		const response = await api.post(`/recoverPassword/`, { email });
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
