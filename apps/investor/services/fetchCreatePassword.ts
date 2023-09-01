import { api } from "./api";
import { UserDataPF } from "../dtos/UserPF";
import { UserDataPJ } from "../dtos/UserPJ";

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
