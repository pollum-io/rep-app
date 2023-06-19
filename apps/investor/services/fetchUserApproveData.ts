import { apiInstance } from "./api";

export const fetchUserApproveData = async (
	opportunity_address: any,
	investor_address: any,
	amount: any,
	token: any
) => {
	try {
		const api = apiInstance();
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
	} catch (error: any) {
		console.log(error.message);
	}
};
