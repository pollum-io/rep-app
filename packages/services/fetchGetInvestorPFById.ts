import { api } from "./api";

export const fetchGetInvestorPFById = async (
	investor_pf: string,
	token: string
) => {
	try {
		const response = await api.get(`/investor/pf/${investor_pf}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
