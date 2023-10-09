import { api } from "../api";

export const fetchCreateEnterprise = async (data: any, token?: string) => {
	try {
		const response = await api.post(
			`/enterprise`,
			data
			// {
			// 	headers: {
			// 		Authorization: `Bearer ${token}`,
			// 	},
			// }
		);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
