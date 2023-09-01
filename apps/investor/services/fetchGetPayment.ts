import { api } from "./api";

export const fetchGetPayment = async (id: string, token: string) => {
	try {
		const response = await api.get(`/payment/${id}`, {
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
