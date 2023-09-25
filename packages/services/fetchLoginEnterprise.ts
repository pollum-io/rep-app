import { api } from "./api";

export const fetchLoginEnterprise = async (email: string, password: string) => {
	const response = await api.post("/signin/enterprise", {
		email: email,
		password: password,
	});
	return response?.data;
};
