import axios, { AxiosInstance } from "axios";

export const apiInstance = (host?: string): AxiosInstance =>
	axios.create({
		baseURL: host ? `http://${host}/api` : "/api",
		headers: {
			"content-type": "application/json",
			accept: "application/json",
		},
	});
