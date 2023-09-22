import { ibgeApi } from "./ibgeApi";

export const fetchGetUf = async () => {
	try {
		const response = await ibgeApi.get(`localidades/estados?orderBy=nome`);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
