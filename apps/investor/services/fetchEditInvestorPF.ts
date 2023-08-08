import { UserDataPF } from "../dtos/UserPF";
import { api } from "./api";

export const fetchEditInvestorPF = async (
	investor_pf: string,
	data: UserDataPF
) => {
	try {
		const response = await api.put(`/investorPF/${investor_pf}`, data, {});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
