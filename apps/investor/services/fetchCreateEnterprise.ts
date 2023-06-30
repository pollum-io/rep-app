import { apiInstance } from "./api";

export const fetchCreateEnterprise = async (data: any, token: any) => {
	const api = apiInstance();
	try {
		const response = await api.post("/enterprise", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
