import { UserDataPJ } from "ui";
import { api } from "./api";

export const fetchEditInvestorPJ = async (
	investor_pj: string,
	data: UserDataPJ,
	token: string
) => {
	try {
		const response = await api.put(`/investor/pj/${investor_pj}`, data, {
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
