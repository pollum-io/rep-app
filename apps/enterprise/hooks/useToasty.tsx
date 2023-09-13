import { ToastyContext } from "../contexts/toasty";
import { useContext } from "react";

export function useToasty() {
	return useContext(ToastyContext);
}
