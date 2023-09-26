import { NextRouter } from "next/router";
import { api } from "../api";

export const logout = async (push: NextRouter["push"]) => {
	try {
		const response = await api.get("/signout");
		if (response.status === 200) {
			push("/");
		}
	} catch (error) {
		// handle error
		console.error(error);
	}
};
