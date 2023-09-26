import { api } from "../api";

export const fetchGetContract = async (id: string) => {
	try {
		const response = await api.get(`/signer/get_document/${id},`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
