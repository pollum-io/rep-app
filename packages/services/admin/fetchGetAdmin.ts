import { api } from "../api";

export const fetchGetAdmin = async () => {
	try {
		const response = await api.get(`/admin`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
