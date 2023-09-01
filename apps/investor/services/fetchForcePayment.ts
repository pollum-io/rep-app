import { api } from "./api";

export const fetchForcePayment = async (
	amount?: number,
	invoice?: string,
	token?: string
) => {
	try {
		const data = {
			invoice_key: invoice,
			amount: amount,
		};
		const response = await api.post(`/force_payment`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		if (error instanceof Error) {
			console.log("Erro", error.message);
		}
	}
};
