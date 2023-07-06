import { IChangePasswordData } from "../dtos/ChangePassword";
import { apiInstance } from "./api";

export const fetchNewPassword = async (
	token: string,
	request: IChangePasswordData,
	host?: string
) => {
	try {
		const api = apiInstance(host);
		const response = await api.put("/newPassword", request, {
			headers: {
				"Content-Type": "application/json",
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
