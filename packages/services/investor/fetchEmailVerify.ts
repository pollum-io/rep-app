import { api } from "../api";

export const fetchEmailVerify = async (email?: string) => {
	try {
		const response = await api.post(`/recoverPassword/`, { email });
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
