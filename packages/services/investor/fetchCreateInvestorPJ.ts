import { ICreateInvestorPJ } from "ui";
import { api } from "../api";

export const fetchCreateInvestorPJ = async (data: ICreateInvestorPJ) => {
	try {
		const response = await api.post("/investor/pj", data);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
