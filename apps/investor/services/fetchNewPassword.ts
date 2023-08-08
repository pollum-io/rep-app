import { IChangePasswordData } from "../dtos/ChangePassword";
import { api } from "./api";

export const fetchNewPassword = async (request: IChangePasswordData) => {
	try {
		const response = await api.put("/newPassword", request);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
