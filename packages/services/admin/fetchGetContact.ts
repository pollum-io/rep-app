import { api } from "../api";

export const fetchGetContact = async (page?: number) => {
	try {
		const response = await api.get(`/contact?page=${page}`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
