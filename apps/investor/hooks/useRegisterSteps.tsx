import { RegisterStepsContext } from "../contexts/register";
import { useContext } from "react";

export function useRegisterSteps() {
	return useContext(RegisterStepsContext);
}
