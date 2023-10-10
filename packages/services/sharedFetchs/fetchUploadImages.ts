import { api } from "../api";

export async function fetchUploadImages(formData: FormData) {
	try {
		const response = await api.post("/file", formData);

		console.log(response, "response");
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
}
