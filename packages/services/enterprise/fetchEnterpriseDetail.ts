import { api } from "../api";

export const fetchEnterpriseDetail = async (
	id: string | undefined,
	token: string
) => {
	try {
		const response = await api.get(`/enterprise/opportunity/${id}/detail`, {
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
