import { UserDataPJ } from "../dtos/UserPJ";
import { api } from "./api";

export const fetchEditInvestorPJ = async (
	investor_pj: string,
	data: UserDataPJ
) => {
	try {
		const response = await api.put(`/investorPJ/${investor_pj}`, data);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
