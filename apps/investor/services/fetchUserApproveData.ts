import { api } from "./api";

export const fetchUserApproveData = async (
	opportunity_address: string,
	investor_address: string,
	amount: number,
	token: string
) => {
	try {
		const response = await api.post(
			`/approve/`,
			{
				investor_address,
				opportunity_address,
				amount,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};
