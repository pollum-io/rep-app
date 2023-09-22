import { ibgeApi } from "./ibgeApi";

export const fetchGetCitiesByUf = async (uf: string) => {
	try {
		console.log(uf, "UFFFFFFFFFFFFF");
		const response = await ibgeApi.get(
			`localidades/estados/${uf}/municipios?orderBy=nome`
		);
		console.log(response, "response");
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
