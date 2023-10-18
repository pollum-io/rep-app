import { CreateCompanieStepsContext } from "../contexts/register";
import { useContext } from "react";

export function useCreateCompanieSteps() {
	return useContext(CreateCompanieStepsContext);
}
