import { UserDataPF } from "ui";
import { api } from "./api";

export const fetchEditInvestorPF = async (
	investor_pf: string,
	data: UserDataPF,
	token: string
) => {
	try {
		const response = await api.put(`/investor/pf/${investor_pf}`, data, {
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
