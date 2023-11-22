import { CreateAdminCreateStepsContext } from "../contexts/register";
import { useContext } from "react";

export function useCreateAdminCreateSteps() {
	return useContext(CreateAdminCreateStepsContext);
}
