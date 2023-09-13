import { api } from "./api";

export const fetchSignIn = async (email: string, password: string) => {
	const response = await api.post("/signin", {
		email: email,
		password: password,
	});
	return response.data;
};
