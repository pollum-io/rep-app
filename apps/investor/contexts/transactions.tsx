/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
	useContractRead,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import { useWallet } from "../hooks/useWallet";
import compliantTokenABI from "../utils/abi/compliantToken.json";
import crowdSaleABI from "../utils/abi/crowdSale.json";
import drexABI from "../utils/abi/drex.json";
import faucetABI from "../utils/abi/faucet.json";

interface ITransactions {
	isWhitelisted: unknown;
	addToWhitelist: (paramA: string) => void;
	addToWhitelistTx: unknown;
	getBoughtTokens: unknown;
	getDrexAvailableForRefund: unknown;
	getAvailableTokensToClaim: unknown;
	getAvailableTokens: unknown;
	calculateTokenAmount: unknown;
	closeTime: unknown;
	maxBuyAllowed: unknown;
	tokenSold: unknown;
	isOpen: unknown;
	buyToken: unknown;
	buyTokenTx: unknown;
	approve: (paramA: string, paramB: number) => void;
	approveTx: unknown;
	balanceOf: unknown;
	balanceOfTx: unknown;
	claimTokens: () => void;
	claimTokensTx: unknown;
	amount: number;
	setAmount: React.Dispatch<React.SetStateAction<number>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	balance: number;
	setBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsContext = createContext({} as ITransactions);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [amount, setAmount] = useState(0);
	const [balance, setBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const { address } = useWallet();

	// const waitForApproval = async (txHash: string) => {
	// 	return new Promise((resolve, reject) => {
	// 		const intervalId = setInterval(async () => {
	// 			try {
	// 				const transaction = await publicClient
	// 					.getTransactionReceipt({
	// 						hash: txHash,
	// 					})
	// 					.catch(() => null);
	// 				if (transaction && transaction?.status) {
	// 					clearInterval(intervalId);
	// 					resolve(transaction);
	// 				}
	// 			} catch (err) {
	// 				clearInterval(intervalId);
	// 				reject(err);
	// 			}
	// 		}, 2000);
	// 	});
	// };

	//////////////////////////////////
	// Compliant Token
	//////////////////////////////////

	const { data: isWhitelisted } = useContractRead({
		address: "0xEa86E79d1e6e0BC741Fd2523163DcAD6A11e9fAa",
		abi: compliantTokenABI,
		functionName: "isWhitelisted",
		args: [address],
	});

	const addToWhitelist = useContractWrite({
		address: "0xEa86E79d1e6e0BC741Fd2523163DcAD6A11e9fAa",
		abi: compliantTokenABI,
		functionName: "addToWhitelist",
		args: [address],
	});

	const addToWhitelistTx = useWaitForTransaction({
		hash: addToWhitelist?.data?.hash,
	});

	//////////////////////////////////
	// Crowd Sale
	//////////////////////////////////

	const { data: getBoughtTokens } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "getBoughtTokens",
		args: [address],
	});

	const { data: getDrexAvailableForRefund } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "getDrexAvailableForRefund",
		args: [address],
	});

	const { data: getAvailableTokensToClaim } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "getAvailableTokensToClaim",
		args: [address],
	});

	const { data: getAvailableTokens } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "getAvailableTokens",
		args: [address],
	});

	const { data: calculateTokenAmount } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "calculateTokenAmount",
		args: [address],
	});

	const { data: closeTime } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "closeTime",
		args: [address],
	});

	const { data: maxBuyAllowed } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "maxBuyAllowed",
		args: [address],
	});

	const { data: tokenSold } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "tokenSold",
		args: [address],
	});

	const { data: isOpen } = useContractRead({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "isOpen",
		args: [address],
	});

	const buyToken = useContractWrite({
		address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
		abi: crowdSaleABI,
		functionName: "buyToken",
		args: [amount],
	});

	const buyTokenTx = useWaitForTransaction({
		hash: buyToken?.data?.hash,
	});

	//////////////////////////////////
	// DREX
	//////////////////////////////////

	const approve = useContractWrite({
		address: "0xC4BAF91be09e5D5CBBDD78844C2877F9c85e4474",
		abi: drexABI,
		functionName: "approve",
	});

	const approveTx = useWaitForTransaction({
		hash: approve?.data?.hash,
	});

	const balanceOf = useContractRead({
		address: "0xC4BAF91be09e5D5CBBDD78844C2877F9c85e4474",
		abi: drexABI,
		functionName: "balanceOf",
		args: [address],
	});

	//////////////////////////////////
	// Faucet
	//////////////////////////////////

	const claimTokens = useContractWrite({
		address: "0x2a90C43A836F95C2664D5a0B559C945eA74e0Ca1",
		abi: faucetABI,
		functionName: "claimTokens",
	});

	const claimTokensTx = useWaitForTransaction({
		hash: claimTokens?.data?.hash,
	});

	//////////////////////////////////
	// Handlers
	//////////////////////////////////

	useEffect(() => {
		if (
			claimTokens.isLoading ||
			approve.isLoading ||
			buyToken.isLoading ||
			addToWhitelist.isLoading
		) {
			setIsLoading(true);
		}
		if (
			claimTokens.isSuccess ||
			approve.isSuccess ||
			buyToken.isSuccess ||
			addToWhitelist.isSuccess ||
			claimTokens.isError ||
			approve.isError ||
			buyToken.isError ||
			addToWhitelist.isError
		) {
			setIsLoading(false);
		}
	}, [
		addToWhitelist.isError,
		addToWhitelist.isLoading,
		addToWhitelist.isSuccess,
		approve.isError,
		approve.isLoading,
		approve.isSuccess,
		buyToken.isError,
		buyToken.isLoading,
		buyToken.isSuccess,
		claimTokens.isError,
		claimTokens.isLoading,
		claimTokens.isSuccess,
	]);

	useEffect(() => {
		setBalance(Number(balanceOf.data));
	}, [balanceOf, address, balance]);

	const providerValue = useMemo(
		() => ({
			isWhitelisted,
			addToWhitelist,
			addToWhitelistTx,
			getBoughtTokens,
			getDrexAvailableForRefund,
			getAvailableTokensToClaim,
			getAvailableTokens,
			calculateTokenAmount,
			closeTime,
			maxBuyAllowed,
			tokenSold,
			isOpen,
			buyToken,
			buyTokenTx,
			approve,
			approveTx,
			balanceOf,
			claimTokens,
			claimTokensTx,
			amount,
			setAmount,
			isLoading,
			setIsLoading,
			balance,
			setBalance,
		}),
		[
			addToWhitelist,
			addToWhitelistTx,
			approve,
			approveTx,
			balanceOf,
			buyToken,
			buyTokenTx,
			calculateTokenAmount,
			claimTokens,
			claimTokensTx,
			closeTime,
			getAvailableTokens,
			getAvailableTokensToClaim,
			getBoughtTokens,
			getDrexAvailableForRefund,
			isOpen,
			isWhitelisted,
			maxBuyAllowed,
			tokenSold,
			amount,
			setAmount,
			isLoading,
			setIsLoading,
			balance,
			setBalance,
		]
	);
	{
	}

	return (
		<TransactionsContext.Provider value={providerValue}>
			{children}
		</TransactionsContext.Provider>
	);
};
