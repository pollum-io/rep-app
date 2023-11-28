import { api } from "../api";

export const fetchCodeVerify = async (code?: string) => {
	try {
		const response = await api.get(`/codeVerify?code=${code}`);

		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
