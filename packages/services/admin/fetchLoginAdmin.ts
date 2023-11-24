import { api } from "../api";

export const fetchLoginAdmin = async (email: string, password: string) => {
	const response = await api.post("/signin/admin", {
		email: email,
		password: password,
	});
	return response?.data;
};
