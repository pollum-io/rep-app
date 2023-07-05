import { UserDataPJ } from "../dtos/UserPJ";
import { apiInstance } from "./api";

export const fetchEditInvestorPJ = async (
	investor_pj: string,
	data: UserDataPJ,
	token: string
) => {
	try {
		const api = apiInstance();
		const response = await api.put(`/investorPJ/${investor_pj}`, data, {
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
