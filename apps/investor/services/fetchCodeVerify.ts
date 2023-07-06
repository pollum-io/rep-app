import { apiInstance } from "./api";

export const fetchCodeVerify = async (code?: string, host?: string) => {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/codeVerify?code=${code}`);

		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
