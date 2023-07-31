import { apiInstance } from "./api";

export const authenticate = async (email: string, password: string) => {
	const api = apiInstance();
	const response = await api.post("/user/authenticate", {
		email: email,
		password: password,
	});
	console.log(response);
	return response.data;
};
