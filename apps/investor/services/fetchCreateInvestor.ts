import { ICreateInvestorPF } from "../dtos/ICreateInvestorPF";
import { api } from "./api";

export const fetchCreateInvestorPF = async (data: ICreateInvestorPF) => {
	try {
		const response = await api.post("/investorPF", data, {});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
