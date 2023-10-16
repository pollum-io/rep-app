import { api } from "../api";

export async function fetchUploadImages(formData: FormData, token: string) {
	try {
		const response = await api.post("/file", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(response, "response");
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
}
