import { api } from "./api";

export const fetchRegisterWhitelisted = async (email: string) => {
	try {
		const response = await api.post("/register/whitelisted", { email });
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
