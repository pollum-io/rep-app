import { UserDataPF, UserDataPJ } from "ui";
import { api } from "./api";

type RequestData = {
	password: string;
	code: string;
};

export async function fetchCreatePassword(
	data: RequestData
): Promise<UserDataPF | UserDataPJ> {
	const response = await api.put("/password/add", data);
	return response.data;
}
