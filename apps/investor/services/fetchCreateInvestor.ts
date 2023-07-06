import { ICreateInvestorPF } from "../dtos/ICreateInvestorPF";
import { apiInstance } from "./api";

export const fetchCreateInvestorPF = async (
	data: ICreateInvestorPF,
	token: string
) => {
	try {
		const api = apiInstance();
		const response = await api.post("/investorPF", data, {
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
