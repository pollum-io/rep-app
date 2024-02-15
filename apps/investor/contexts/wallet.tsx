import React, { createContext, useEffect, useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from "wagmi";

interface IWallet {
	address?: `0x${string}`;
	connectWallet: () => void;
	isConnected: boolean;
	connector: unknown;
	isConnecting: boolean;
	isDisconnected: boolean;
	status: unknown;
	accountData: unknown;
	disconnect: () => void;
}

export const WalletContext = createContext({} as IWallet);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { connect, connectors, data: accountData } = useConnect();
	const {
		isConnected,
		address,
		connector,
		isConnecting,
		isDisconnected,
		status,
	} = useAccount();
	const { disconnect } = useDisconnect();
	const { chains, switchNetwork } = useSwitchNetwork();

	const connectWallet = async () => {
		try {
			connect({ connector: connectors[0] });
		} catch (err: unknown) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (accountData?.chain?.unsupported) {
			switchNetwork?.(1440002);
		}
	}, [accountData?.chain?.unsupported, switchNetwork]);

	const providerValue = useMemo(
		() => ({
			connectWallet,
			isConnected,
			address,
			connector,
			isConnecting,
			isDisconnected,
			status,
			accountData,
			disconnect,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			isConnected,
			address,
			isConnecting,
			isDisconnected,
			status,
			accountData,
			chains,
			accountData,
		]
	);

	return (
		<WalletContext.Provider value={providerValue}>
			{children}
		</WalletContext.Provider>
	);
};
