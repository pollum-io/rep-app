import { ICreateInvestorPF } from "ui";
import { api } from "../api";

export const fetchCreateInvestorPF = async (data: ICreateInvestorPF) => {
	try {
		const response = await api.post("/investor/pf", data);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
