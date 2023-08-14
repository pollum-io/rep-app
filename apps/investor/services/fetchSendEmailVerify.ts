import { api } from "./api";

export const fetchSendEmailVerify = async (email?: string) => {
	try {
		const response = await api.post(`/password/code/send`, { email });
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
