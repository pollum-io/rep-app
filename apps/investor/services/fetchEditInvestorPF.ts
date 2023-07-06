import { UserDataPF } from "../dtos/UserPF";
import { apiInstance } from "./api";

export const fetchEditInvestorPF = async (
	investor_pf: string,
	data: UserDataPF,
	token: string
) => {
	try {
		const api = apiInstance();
		const response = await api.put(`/investorPF/${investor_pf}`, data, {
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
