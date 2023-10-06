import { api } from "../api";

export const fetchGetInvestmentById = async (
	investmentId: string,
	token: string
) => {
	try {
		const response = await api.get(`/investment/${investmentId}`, {
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
