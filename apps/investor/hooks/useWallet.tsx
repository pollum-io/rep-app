import { useContext } from "react";
import { WalletContext } from "../contexts/wallet";

export function useWallet() {
	return useContext(WalletContext);
}
