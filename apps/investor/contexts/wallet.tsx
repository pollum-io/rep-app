// import React, { createContext, useEffect, useMemo, useState } from "react";
// import {
// 	Account,
// 	createWalletClient,
// 	custom,
// 	getAccount,
// 	WalletClient,
// } from "viem";
// import { polygonMumbai } from "viem/chains";
// import PersistentFramework from "../utils/persistent";

// declare let window: string;
// interface IWallet {
// 	connectWallet: string;
// 	disconnectWallet: string;
// 	wallet: WalletClient;
// 	account: `0x${string}`;
// 	isConnected: string;
// 	signer: Account;
// }

// export const WalletContext = createContext({} as IWallet);

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	let wallet: string;
// 	const [isConnected, setIsConnected] = useState<boolean>(false);
// 	const [account, setAccount] = useState<`0x${string}` | string>("");
// 	const [signer, setSigner] = useState<Account | string>();

// 	if (
// 		typeof window !== "undefined" &&
// 		typeof window?.ethereum !== "undefined"
// 	) {
// 		wallet = createWalletClient({
// 			transport: custom(window.ethereum),
// 		});
// 	}

// 	const connectWallet = async () => {
// 		if (
// 			typeof window !== "undefined" &&
// 			typeof window?.ethereum !== "undefined"
// 		) {
// 			try {
// 				const chainId = await wallet.getChainId();
// 				if (chainId !== polygonMumbai.id) {
// 					await wallet
// 						.switchChain({ id: polygonMumbai.id })
// 						.catch(async (error: string) => {
// 							if (error.code === 4902)
// 								await wallet.addChain({ chain: polygonMumbai });
// 						});
// 				} else {
// 					const [address] = await wallet.requestAddresses();
// 					setAccount(address);
// 					setIsConnected(true);
// 					setSigner(getAccount(address));
// 					PersistentFramework.add("connected", { isConnected: true });
// 					PersistentFramework.add("address", address);
// 				}
// 			} catch (err: string) {
// 				setIsConnected(false);
// 				console.log(err.message);
// 			}
// 		} else {
// 			console.log("Instale a metamask");
// 		}
// 	};

// 	const disconnectWallet = () => {
// 		const value = PersistentFramework.get("connected") as {
// 			[k: string]: string;
// 		};

// 		PersistentFramework.remove("address");
// 		PersistentFramework.remove("connected");
// 		PersistentFramework.remove("name");
// 		PersistentFramework.remove("id");
// 		setIsConnected(false);
// 		setAccount("");
// 	};

// 	useEffect(() => {
// 		const value = PersistentFramework.get("connected") as {
// 			[k: string]: string;
// 		};

// 		if (value?.isConnected) {
// 			const address = PersistentFramework.get(
// 				"address"
// 			) as unknown as `0x${string}`;

// 			setIsConnected(true);
// 			setAccount(address);
// 		}
// 	}, []);

// 	const providerValue = useMemo(
// 		() => ({
// 			connectWallet,
// 			disconnectWallet,
// 			wallet,
// 			account,
// 			isConnected,
// 			setIsConnected,
// 			signer,
// 		}),
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 		[account, isConnected, setIsConnected, signer]
// 	);

// 	return (
// 		<WalletContext.Provider value={providerValue}>
// 			{children}
// 		</WalletContext.Provider>
// 	);
// };
