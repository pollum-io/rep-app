import { api } from "../api";

export const fetchForcePayment = async (
	invoice?: string,
	date?: string,
	amount?: number,

	token?: string
) => {
	try {
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
