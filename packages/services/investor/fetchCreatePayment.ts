import { api } from "../api";

export const fetchCreatePayment = async (data) => {
	delete data.has_contribution;

	data.contribution_order = +data.contribution_order;

	try {
		const response = await api.post(`/create_payment`, data, {
			// headers: {
			// 	Authorization: `Bearer ${token}`,
			// },
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
