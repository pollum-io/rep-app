import { ICreateInvestorPJ } from "../dtos/ICreateInvestorPJ";
import { api } from "./api";

export const fetchCreateInvestorPJ = async (
	data: ICreateInvestorPJ,
	token: string
) => {
	try {
		const response = await api.post("/investorPJ", data, {
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
