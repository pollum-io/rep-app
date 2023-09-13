import { api } from "./api";

export const fetchGetInvestorPJById = async (
	investor_pj: string,
	token: string
) => {
	try {
		const response = await api.get(`/investor/pj/${investor_pj}`, {
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
