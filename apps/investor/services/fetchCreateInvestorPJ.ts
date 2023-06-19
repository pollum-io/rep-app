import { apiInstance } from "./api";

export const fetchCreateInvestorPJ = async (data: any, token: any) => {
	const api = apiInstance();
	try {
		const response = await api.post("/investorPJ", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
};
