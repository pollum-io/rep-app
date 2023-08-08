import axios from "axios";

const url = process.env.BACKEND_URL as string;

export const api = axios.create({
	baseURL: `${url}`,
	headers: {
		"content-type": "application/json",
		accept: "application/json",
	},
});
