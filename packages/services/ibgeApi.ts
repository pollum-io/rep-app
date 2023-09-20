import axios from "axios";

const url = "https://servicodados.ibge.gov.br/api/v1";

export const ibgeApi = axios.create({
	baseURL: `${url}`,
});
