import { useContext } from "react";
import { CreateOpportuntyContext } from "../contexts/createOpportunity";

export function useCreateOpportunity() {
	return useContext(CreateOpportuntyContext);
}
