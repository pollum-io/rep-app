/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useTranslation } from "react-i18next";
import { useRegisterSteps } from "../../../hooks";
import { UserDataPF } from "../../../dtos/UserPF";
import { UserDataPJ } from "../../../dtos/UserPJ";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { useUser } from "../../../hooks/useUser";
import { Oval } from "react-loader-spinner";
import { useMutation } from "react-query";
import { useWallet } from "../../../hooks/useWallet";
import { useTransactions } from "../../../hooks/useTransactions";
import { useRouter } from "next/router";
import { useToasty } from "../../../hooks/useToasty";
import { useOpportunities } from "../../../hooks/useOpportunities";

interface IInvestCheckout {
	imovel: IOpportunitiesCard;
	isPerfilCompleted?: boolean;
	userDataPF: UserDataPF;
	userDataPJ?: UserDataPJ;
	token: string;
	oportunitiesAddress: string;
}

export const InvestCheckout: React.FC<IInvestCheckout> = ({
	imovel,
	token,
}) => {
	const { t } = useTranslation();
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { setInvestmentId, setDocLink } = useUser();
	const { cotas, setCotas } = useOpportunities();
	const router = useRouter();
	const { toast } = useToasty();

	const mutation = useMutation(
		async (contractData: unknown) => {
			try {
				const res = await fetchSignContract(contractData, token);
				return res;
			} catch (error) {
				throw new Error("Erro ao assinar contrato");
			}
		},
		{
			onSuccess: (data) => {
				setDocLink(data?.url);
				setInvestmentId(data?.investment_id);
				setSecondStep(true);
				setFirstStep(false);
			},
		}
	);

	const {
		claimTokens,
		isWhitelisted,
		approve,
		addToWhitelist,
		buyToken,
		isLoading,
		balance,
	} = useTransactions();
	const { isConnected, connectWallet, address } = useWallet();

	const buttonLabel = useMemo(() => {
		const labelMap = {
			connected: {
				whitelisted: balance
					? approve.isSuccess
						? "Buy Token"
						: "Approve"
					: "Buy Drex",
				notWhitelisted: "Enter Whitelist",
			},
			notConnected: "Connect to metamask",
		};

		if (isConnected) {
			return isWhitelisted
				? labelMap.connected.whitelisted
				: labelMap.connected.notWhitelisted;
		} else {
			return labelMap.notConnected;
		}
	}, [isConnected, isWhitelisted, balance, approve.isSuccess]);

	const handleButton = useCallback(() => {
		if (isConnected) {
			if (isWhitelisted) {
				if (balance) {
					if (!approve.isSuccess) {
						console.log(approve.status, "AA");
						approve.write({
							args: [
								imovel.sale_address,
								Number(imovel?.min_investment) * Number(1e6) * cotas,
							],
						});
					} else {
						console.log(buyToken.status, "BB");
						buyToken.writeAsync({
							args: [Number(imovel?.min_investment) * Number(1e6) * cotas],
						});
					}
				} else {
					claimTokens.writeAsync();
				}
			} else {
				addToWhitelist.writeAsync({ args: [address] });
			}
		} else {
			connectWallet();
		}
	}, [
		isConnected,
		isWhitelisted,
		balance,
		approve,
		imovel.sale_address,
		imovel?.min_investment,
		cotas,
		buyToken,
		claimTokens,
		addToWhitelist,
		address,
		connectWallet,
	]);

	useEffect(() => {
		router.prefetch("/meus-investimentos");

		if (buyToken.isSuccess) {
			approve.reset();
			buyToken.reset();
			toast({
				id: "toast-create-suc",
				position: "top-right",
				status: "success",
				title: "Transação concluída",
				description:
					"Em breve voce receberá o email com os detalhes e comprovantes da transação",
			});
			router.push("/meus-investimentos");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buyToken.isSuccess, router, toast]);

	const buttonValid = useMemo(() => {
		let isValid: boolean;
		if (
			isConnected &&
			!cotas > 0 &&
			Number(imovel?.min_investment) * Number(1e6) * cotas <= balance
		) {
			isValid = true;
		} else {
			isValid = false;
		}
		return isValid;
	}, [isConnected, balance, imovel?.min_investment, cotas]);

	const loader = useMemo(() => {
		if (buyToken.isLoading || approve.isLoading) {
			return (
				<Flex position={"absolute"} left={"50%"} bottom={"50%"} zIndex={9999}>
					<Oval
						height={98}
						width={98}
						color="#29525f"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#a8a8a8"
						strokeWidth={4}
						strokeWidthSecondary={4}
					/>
				</Flex>
			);
		}
	}, [approve.isLoading, buyToken.isLoading]);

	useMemo(() => {
		if (approve?.isError) {
			toast({
				id: "toast-create-suc",
				position: "top-right",
				status: "error",
				title: "Approve error",
			});
		}
		if (buyToken?.isError) {
			toast({
				id: "toast-create-suc",
				position: "top-right",
				status: "error",
				title: "Buy token error",
			});
		}
	}, [approve?.isError, buyToken?.isError, toast]);

	return (
		<Flex w="100%" gap="5%" justifyContent="space-between" mb="12rem">
			{loader}
			<Flex flexDir={"column"}>
				<Flex>
					<Text
						mb={"1.4688rem"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
					>
						Resumo do investimento
					</Text>
				</Flex>
				<Flex flexDir={"column"} gap={"1rem"}>
					<Flex w={"41.875rem"}>
						<Flex flex={"2"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Imóvel
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Preço unitário
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Quantidade
							</Text>
						</Flex>
					</Flex>
					<Flex
						alignItems={"center"}
						border={"1px solid #f0f0f0"}
						borderRadius={"0.75rem"}
					>
						<Flex flex={"2"} alignItems={"center"}>
							<Img
								w={"5.6941rem"}
								h={"4.25rem"}
								src={`/api/file/${imovel?.pictures_enterprise[0]}`}
								borderLeftRadius={"0.75rem"}
							/>
							<Flex pl={"1rem"} flexDir={"column"}>
								<Text color={"#171923"} fontWeight={"500"}>
									{imovel?.name}
								</Text>
								<Text color={"#2D3748"} fontSize={"0.75rem"}>
									{imovel?.enterprise_type}
								</Text>
							</Flex>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"}>
								{formatCurrency(imovel?.min_investment)}
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"}>{cotas} cota</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" justifyContent={"end"}>
				<Flex
					padding="1.5rem"
					w="23.125rem"
					fontFamily="Poppins"
					h="max-content"
					bg="#003243"
					boxShadow="0rem 1.25rem 1.5625rem rgba(31, 41, 55, 0.1), 0rem 0.625rem 0.625rem rgba(31, 41, 55, 0.04)"
					borderRadius="0.75rem"
					gap="1rem"
					flexDirection="column"
					color="#FFFFFF"
				>
					<Text fontWeight="500" fontSize="1.25rem">
						{t("wantToInvest.confirmData")}
					</Text>
					<Flex
						bgColor={"#29525f"}
						py="0.5rem"
						px="1rem"
						borderRadius="0.5rem"
						justifyContent={"space-between"}
						alignItems="center"
					>
						<Flex flexDir={"column"}>
							<Text fontSize={"0.75rem"} fontWeight="500">
								{t("opportunitieDetails.select")}
							</Text>
							<Text fontSize={"0.875rem"} fontWeight="400">
								{t("opportunitieDetails.priceCard.shares", { value: cotas })}
							</Text>
						</Flex>

						<Flex gap="0.3125rem">
							<Img
								_hover={{
									cursor: mutation.isLoading === false ? "pointer" : "default",
									opacity: mutation.isLoading === false ? 0.5 : 0.2,
									transition: "all 0.4s",
								}}
								opacity={mutation.isLoading === false ? "1" : "0.2"}
								src={"/icons/PlusIcon.png"}
								onClick={() =>
									!mutation.isLoading ? setCotas(cotas + 1) : null
								}
							/>
							<Img
								_hover={{
									cursor: mutation.isLoading === false ? "pointer" : "default",
									opacity: mutation.isLoading === false ? 0.5 : 0.2,
									transition: "all 0.4s",
								}}
								opacity={mutation.isLoading === false ? "1" : "0.2"}
								src={"/icons/MinusIcon.png"}
								onClick={() =>
									!mutation.isLoading
										? setCotas(cotas === 0 ? 0 : cotas - 1)
										: null
								}
							/>
						</Flex>
					</Flex>
					<Flex
						justifyContent="space-between"
						fontSize="1rem"
						fontWeight="500"
						mt={"1rem"}
					>
						<Text>Total</Text>
						<Text>{formatCurrency(cotas * (imovel?.min_investment ?? 0))}</Text>
					</Flex>
					<Flex
						mt="1rem"
						flexDirection="column"
						gap="1rem"
						fontFamily="Poppins"
						fontSize="0.875rem"
						lineHeight="1.25rem"
						color="#FFFFFF"
						alignItems={"center"}
					>
						<Button
							justifyContent="center"
							alignItems="center"
							w="100%"
							h="2.5rem"
							bgColor={
								mutation.isLoading === false
									? "#FFFFFF"
									: "rgba(255, 255, 255, 0.80)"
							}
							borderRadius="0.5rem"
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="1rem"
							lineHeight="1.5rem"
							color="#007088"
							_hover={{ bgColor: "#EDF2F7" }}
							_active={{ bgColor: "#E2E8F0" }}
							onClick={handleButton}
							isDisabled={buttonValid}
							disabled={buttonValid}
						>
							{buttonLabel}
							{mutation.isLoading && (
								<Flex pl={"0.625rem"}>
									<Oval
										height={18}
										width={18}
										color="#29525f"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
										ariaLabel="oval-loading"
										secondaryColor="#EDF2F7"
										strokeWidth={4}
										strokeWidthSecondary={4}
									/>
								</Flex>
							)}
						</Button>
						<Text fontWeight={"400"} fontSize={"xs"} display={"flex"}>
							{t("opportunitieDetails.wontBe")}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
