import { NextRouter } from "next/router";
import { apiInstance } from "./api";

export const logout = async (push: NextRouter["push"]) => {
	try {
		const api = apiInstance();
		const response = await api.get("/user/logout");
		if (response.status === 200) {
			push("/");
		}
	} catch (error) {
		// handle error
		console.error(error);
	}
};
