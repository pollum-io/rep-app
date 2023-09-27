import { api } from "../api";

export const fetchEnterpriseShareholders = async (
	id: string | undefined,
	token: string,
	page?: number,
	status?: string
) => {
	const haveStatus = status ? `&status=${status}` : "";
	try {
		const response = await api.get(
			`/enterprise/${id}/shareholders?page=${page}${haveStatus}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
