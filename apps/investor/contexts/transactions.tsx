// import React, { createContext, useMemo, useState } from "react";
// import {
// 	PublicClient,
// 	createPublicClient,
// 	custom,
// 	getAccount,
// 	http,
// } from "viem";
// import { polygonMumbai } from "viem/chains";
// import { useWallet } from "../hooks/useWallet";
// import { fetchUserApproveData } from "../services/fetchUserApproveData";
// import ERC20Mod from "../utils/abi/ERC20Mod.json";
// import livnERC20 from "../utils/abi/livnERC20.json";
// import PersistentFramework from "../utils/persistent";

// declare let window: string;

// type PublicClientType = PublicClient<string>;
// interface ITransactions {
// 	shares: (oportunityAddress: string, accountAddress: string) => Promise<void>;
// 	approve: (
// 		spender: string,
// 		amount: number,
// 		address: `0x${string}`,
// 		token?: string
// 	) => Promise<void>;
// }

// export const TransactionsContext = createContext({} as ITransactions);

// export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	let publicClient: PublicClientType;
// 	const { wallet, signer } = useWallet();

// 	if (
// 		typeof window !== "undefined" &&
// 		typeof window?.ethereum !== "undefined"
// 	) {
// 		publicClient = createPublicClient({
// 			chain: polygonMumbai,
// 			transport: http(),
// 		});
// 	}

// 	const approve = async (
// 		spender: string,
// 		amount: number,
// 		address: `0x${string}`,
// 		token?: string
// 	) => {
// 		try {
// 			const { request } = await publicClient.simulateContract({
// 				address: "0xf1afd12a36f60663cd41b69d486432cc32e3a336" as `0x${string}`,
// 				abi: ERC20Mod,
// 				functionName: "approve",
// 				args: [spender, amount],
// 				chain: polygonMumbai,
// 				account: getAccount(address) || signer,
// 			});

// 			const txHash = await wallet?.writeContract(request);

// 			await waitForApproval(txHash);
// 			await fetchUserApproveData(spender, address, String(amount), token);
// 		} catch (error) {
// 			if (error instanceof Error) {
// 				console.log(error, "Erro");
// 			}
// 		}
// 	};

// 	const waitForApproval = async (txHash: string) => {
// 		return new Promise((resolve, reject) => {
// 			const intervalId = setInterval(async () => {
// 				try {
// 					const transaction = await publicClient
// 						.getTransactionReceipt({
// 							hash: txHash,
// 						})
// 						.catch(() => null);
// 					if (transaction && transaction?.status) {
// 						clearInterval(intervalId);
// 						resolve(transaction);
// 					}
// 				} catch (err) {
// 					clearInterval(intervalId);
// 					reject(err);
// 				}
// 			}, 2000);
// 		});
// 	};

// 	const shares = async (oportunityAddress: string, accountAddress: string) => {
// 		const sharesValue = await publicClient?.readContract({
// 			address: oportunityAddress,
// 			abi: livnERC20,
// 			functionName: "balanceOf",
// 			args: [accountAddress],
// 		});
// 		return sharesValue;
// 	};

// 	const providerValue = useMemo(
// 		() => ({
// 			approve,
// 			shares,
// 		}),
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 		[]
// 	);

// 	return (
// 		<TransactionsContext.Provider value={providerValue}>
// 			{children}
// 		</TransactionsContext.Provider>
// 	);
// };
