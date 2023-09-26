import { date } from "zod";
import { api } from "../api";

export const fetchForcePayment = async (
	invoice?: string,
	date?: string,
	amount?: number,

	token?: string
) => {
	try {
		console.log(amount, "amount");
		console.log(invoice, "invoice");
		console.log(date, "date");

		const response = await api.post(
			`/force_payment`,
			{ invoice_key: invoice, due_date: date, amount: amount },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
