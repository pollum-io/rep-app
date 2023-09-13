import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const api = axios.create({
	baseURL: `${url}`,
	withCredentials: true,
});
