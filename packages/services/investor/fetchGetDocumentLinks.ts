import { api } from "../api";

export async function fetchGetDocumentLinks(token: string, doc: string) {
	try {
		const response = await api.get(`/signer/get_document/${doc}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response?.data;
	} catch (error) {
		console.error(error);
	}
}
