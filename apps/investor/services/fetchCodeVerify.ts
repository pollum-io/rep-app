import { apiInstance } from "./api";

export const fetchCodeVerify = async (code?: any, host?: string) => {
	try {
		const api = apiInstance(host);
		const response = await api.get(`/codeVerify?code=${code}`);

		return response;
	} catch (error: any) {
		console.log("Erro", error.message);
	}
};
