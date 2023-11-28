import { CreateCompanyContext } from "../contexts/createCompany";
import { useContext } from "react";

export function useCreateCompany() {
	return useContext(CreateCompanyContext);
}
