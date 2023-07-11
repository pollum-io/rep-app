import { ICreateInvestorPJ } from "../dtos/ICreateInvestorPJ";
import { apiInstance } from "./api";

export const fetchTurnPerfilEdit = async (
	data: ICreateInvestorPJ,
	token: string
) => {
	const api = apiInstance();
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
