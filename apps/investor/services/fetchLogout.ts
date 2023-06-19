import { apiInstance } from "./api";

export const logout = async (push: any) => {
	try {
		const api = apiInstance();
		const response = await api.get("/user/logout");
		if (response.status === 200) {
			push("/");
		}
	} catch (error) {
		// handle error
		console.error(error);
	}
};
