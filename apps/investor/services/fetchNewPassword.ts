import { IChangePasswordData } from "../dtos/ChangePassword";
import { api } from "./api";

export const fetchNewPassword = async (
	token: string,
	request: IChangePasswordData
) => {
	try {
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
