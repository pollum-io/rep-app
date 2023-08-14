import { api } from "./api";

export const fetchChangePassword = async (code: string, password: string) => {
	try {
		const response = await api.put("/trocar-senha", { code, password });
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
