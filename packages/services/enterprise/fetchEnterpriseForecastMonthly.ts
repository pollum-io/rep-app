import { api } from "../api";

export const fetchEnterpriseForecastMonthly = async (
	id: string | undefined,
	token: string
) => {
	try {
		const response = await api.get(`/enterprise/${id}/forecast/monthly`, {
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
