import React, { useMemo, useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { ICompaniesDetails } from "../../Companies/CompaniesCard/dto";
import { formatCNPJ } from "../../../utils/formatCnpj";
import { fetchContributionById } from "../../../services/fetchContributionById";
import { useUser } from "../../../hooks/useUser";
import Base64Image from "../qrcode";
import { formattedDateWithYour } from "../../../utils/formatDate";
import { fetchGetInvestmentById } from "../../../services/fetchGetInvestmentById";
import { useToasty } from "../../../hooks/useToasty";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchForcePayment } from "../../../services/fetchForcePayment";

interface IContractSign {
	imovel?: IOpportunitiesCard;
	enterprise?: ICompaniesDetails;
	token?: string;
	investor?: string;
	isCheckout?: boolean;
	imovelPayment?: any;
	contributionIdCheck?: any;
}

export const InvestPayment: React.FC<IContractSign> = ({
	imovel,
	enterprise,
	token,
	investor,
	isCheckout,
	imovelPayment,
	contributionIdCheck,
}) => {
	const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);
	const [pixDate, setPixDate] = useState<string | null>(null);
	const [copyQrCodeAddress, setCopyQrCodeAddress] = useState<string | null>(
		null
	);
	const [copied, setCopied] = useState(false);
	const { contributionId, investmentId } = useUser();
	const { cotas } = useOpportunities();
	const { toast } = useToasty();
	const { push } = useRouter();

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(copyQrCodeAddress);
			setCopied(true);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	};

	const {
		data: contribution,
		isError,
		isLoading,
	} = useQuery(
		isCheckout
			? ["contributionOnCheckout", contributionId]
			: ["contributionMyInvestPayment", imovelPayment?.contribution?._id],
		async () => {
			try {
				return isCheckout
					? await fetchContributionById(
							token,
							investor,
							contributionIdCheck || contributionId
					  )
					: await fetchContributionById(
							token,
							investor,
							imovelPayment?.contribution?._id
					  );
			} catch (error) {
				throw new Error("Erro ao buscar contribuição");
			}
		},
		{}
	);

	useMemo(() => {
		if (!isLoading && !isError && contribution) {
			setPixDate(contribution.due_date);
			const dataURL = `data:image/png;base64,${contribution.pix_qr_code}`;
			setQRCodeImage(dataURL);
			setCopyQrCodeAddress(contribution.pix_payload);
		}
	}, [isLoading, isError, contribution]);

	const {
		data: investment,
		isError: isErrorInvestment,
		isLoading: isLoadingInvestment,
	} = useQuery(
		["investment", investmentId, isCheckout],
		async () => {
			try {
				if (isCheckout) {
					return await fetchGetInvestmentById(investmentId, token);
				} else {
					return await fetchGetInvestmentById(
						imovelPayment?.contribution?.investment_id,
						token
					);
				}
			} catch (error) {
				throw new Error("Erro ao buscar investimento");
			}
		},
		{
			refetchInterval: 3000, // Refetch a cada 5 segundos
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
		}
	);

	const {
		data: forcePayment,
		isError: isForcePaymentError,
		isLoading: isForcePaymentLoading,
	} = useQuery(
		["forcePayment", isCheckout],
		async () => {
			try {
				if (!isCheckout) {
					return await fetchForcePayment(
						imovelPayment?.contribution?.invoice_key,
						imovelPayment?.contribution?.due_date,
						imovelPayment?.contribution?.amount,

						token
					);
				} else {
					return;
				}
			} catch (error) {
				throw new Error("Erro ao buscar investimento");
			}
		},
		{
			refetchInterval: 3000, // Refetch a cada 5 segundos
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
		}
	);

	useMemo(() => {
		if (copied) {
			toast({
				id: "toast-edit",
				position: "top-right",
				status: "success",
				title: "QRCode Copiado",
				description: "",
			});
		}
	}, [copied, toast]);

	useMemo(() => {
		if (
			!isErrorInvestment &&
			!isLoadingInvestment &&
			investment?.status === "InProgress"
		) {
			toast({
				id: "toast-edit",
				position: "top-right",
				status: "success",
				title: "Pagamento realizado!",
				description: "Seu pagamento foi realizado com sucesso!",
			});
			push("/meus-investimentos");
		}
	}, [investment?.status, isErrorInvestment, isLoadingInvestment, push, toast]);

	return (
		<Flex
			w="100%"
			gap="5%"
			justifyContent="space-between"
			mb="12rem"
			mt={isCheckout === false ? "7.875rem" : "unset"}
		>
			<Flex flexDir={"column"}>
				<Flex flexDir={"column"}>
					{isCheckout === false && (
						<Flex
							mb={"1.4688rem"}
							color={"#00576B"}
							fontSize={"0.75rem"}
							fontWeight={"500"}
							bgColor={"#E4F2F3"}
							borderRadius={"2.6875rem"}
							px={"2rem"}
							py={"0.1rem"}
							h={"max"}
							w={"max"}
						>
							Parcela {imovelPayment?.contribution?.installment} de{" "}
							{imovelPayment?.num_installments}
						</Flex>
					)}
					<Text
						mb={"1.4688rem"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
					>
						Enviar{" "}
						{isCheckout
							? formatCurrency(imovel?.min_investment * cotas)
							: formatCurrency(imovelPayment?.contribution?.amount)}{" "}
						para:
					</Text>
					<Flex flexDir={"column"} mb={"1rem"}>
						<Text
							color={"#171923"}
							fontSize={"0.875rem"}
							fontWeight={"500"}
							w={"100%"}
						>
							{enterprise?.enterprise_name}
						</Text>
						<Text fontSize={"0.875rem"} color={"#000"} w={"100%"}>
							{formatCNPJ(enterprise?.cnpj)}
						</Text>
					</Flex>
					<Flex mb={"1rem"} flexDir={"column"}>
						<Flex flexDir={"row"} gap={"0.4rem"}>
							<Text color={"#171923"} fontSize={"0.875rem"} fontWeight={"500"}>
								Banco:
							</Text>
							<Text fontSize={"0.875rem"} color={"#000"}>
								{isCheckout
									? enterprise?.payment_info?.bank_account
									: imovelPayment?.bank_account}
							</Text>
						</Flex>
						<Flex flexDir={"row"} gap={"0.4rem"}>
							<Text color={"#171923"} fontSize={"0.875rem"} fontWeight={"500"}>
								Agencia:
							</Text>
							<Text fontSize={"0.875rem"} color={"#000"}>
								{isCheckout
									? enterprise?.payment_info?.branch
									: imovelPayment?.branch}
							</Text>
						</Flex>
						<Flex flexDir={"row"} gap={"0.4rem"}>
							<Text color={"#171923"} fontSize={"0.875rem"} fontWeight={"500"}>
								Conta:
							</Text>
							<Text fontSize={"0.875rem"} color={"#000"}>
								{isCheckout
									? enterprise?.payment_info?.account
									: imovelPayment?.account}
							</Text>
						</Flex>
					</Flex>
					<Flex>
						<Text color={"#fd5757"}>
							Vencimento: {formattedDateWithYour(pixDate)}
						</Text>
					</Flex>
				</Flex>
				<Flex
					my={"1rem"}
					w={"34.375rem"}
					bg={"#E4F2F3"}
					px={"1rem"}
					py={"0.5rem"}
					borderRadius={"0.75rem"}
					gap={"1rem"}
					boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);"
				>
					<Img src="icons/warn.svg" />
					<Text color={"#000"} fontSize={"0.875rem"}>
						O contrato será válido apenas se o pagamento for realizado dentro de
						48 horas.{" "}
					</Text>
				</Flex>
				<Flex gap={"0.5rem"} mt={"1rem"} flexDir={"row"} alignItems={"center"}>
					<Oval
						height={35}
						width={35}
						color="#1789A3"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#bdbdbd"
						strokeWidth={4}
						strokeWidthSecondary={4}
					/>
					<Text color={"#718096"} fontSize={"0.875rem"}>
						Aguardando pagamento...
					</Text>
				</Flex>
			</Flex>
			<Flex
				justifyContent={"end"}
				flexDir={"column"}
				alignItems={"center"}
				px={"2rem"}
				py={"1.5rem"}
				gap={"1.5rem"}
				w={"16.5rem"}
				borderRadius={"0.75rem"}
				boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);"
			>
				<Text
					mb={"1rem"}
					color={"#1789A3"}
					fontSize={"1.125rem"}
					fontWeight={"600"}
				>
					Escaneie o código{" "}
				</Text>
				<Base64Image imageData={qrCodeImage} />
				<Button
					px={"0.75rem"}
					py={"0.625rem"}
					bgColor={"#1789A3"}
					borderRadius={"0.75rem"}
					h={"max"}
					w={"100%"}
					fontWeight={"500"}
					color={"#fff"}
					alignItems={"center"}
					onClick={() => copyToClipboard()}
				>
					Copiar QR Code
				</Button>
			</Flex>
		</Flex>
	);
};
