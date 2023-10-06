import { useContext } from "react";
import { OpportunitiesContext } from "../contexts/opportunities";

export function useOpportunities() {
	return useContext(OpportunitiesContext);
}
