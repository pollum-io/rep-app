import { IChangePasswordData } from "ui";
import { api } from "../api";

export const fetchNewPassword = async (
	request: IChangePasswordData,
	token: string
) => {
	try {
		const response = await api.post("/password/change", request, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
