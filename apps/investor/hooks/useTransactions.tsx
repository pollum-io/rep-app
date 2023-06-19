import { useContext } from "react";
import { TransactionsContext } from "../contexts/transactions";

export function useTransactions() {
	return useContext(TransactionsContext);
}
