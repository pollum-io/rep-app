import React, { useEffect, useMemo, useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { ICompaniesDetails } from "../../Companies/CompaniesCard/dto";
import { formatCNPJ } from "../../../utils/formatCnpj";
import { useRegisterSteps } from "../../../hooks";
import { fetchContributionById } from "../../../services/fetchContributionById";
import { useUser } from "../../../hooks/useUser";
import Base64Image from "../qrcode";
import { formattedDateWithYour } from "../../../utils/formatDate";
import { fetchGetInvestmentById } from "../../../services/fetchGetInvestmentById";
import { useToasty } from "../../../hooks/useToasty";
import { useRouter } from "next/router";

interface IContractSign {
	imovel?: IOpportunitiesCard;
	enterprise?: ICompaniesDetails;
	token?: string;
	investor?: string;
}

export const InvestPayment: React.FC<IContractSign> = ({
	imovel,
	enterprise,
	token,
	investor,
}) => {
	const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);
	const [pixDate, setPixDate] = useState<string | null>(null);
	const [copyQrCodeAddress, setCopyQrCodeAddress] = useState<string | null>(
		null
	);
	const [copied, setCopied] = useState(false);

	const { contributionId, investmentId, setContributionId } = useUser();
	const { cotas } = useOpportunities();
	const { setFirstStep, setSecondStep } = useRegisterSteps();
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

	useMemo(() => {
		if (copied) {
			toast({
				id: "toast-edit",
				position: "top-right",
				status: "success",
				title: "QRCode Copiado",
				description: "",
			});
		} else {
			console.log("erro");
		}
	}, [copied, toast]);

	useEffect(() => {
		const openLinkInNewTab = async () => {
			const request = await fetchContributionById(
				token,
				investor,
				contributionId
			);
			setPixDate(request?.due_date);
			const dataURL = `data:image/png;base64,${request?.pix_qr_corde}`;
			setQRCodeImage(dataURL);
			setCopyQrCodeAddress(request?.pix_payload);
		};
		openLinkInNewTab();
	}, [contributionId, investor, token]);

	useEffect(() => {
		const intervalId = setInterval(async () => {
			try {
				const res = await fetchGetInvestmentById(investmentId, token);

				if (res?.status === "Recieved") {
					setFirstStep(true);
					setSecondStep(false);
					clearInterval(intervalId);
					push("/meus-investimentos");
				}
			} catch (error) {
				console.error("Erro ao buscar investimento:", error);
			}
		}, 5000);
		return () => {
			clearInterval(intervalId);
		};
	}, [investmentId, setContributionId, setFirstStep, setSecondStep, token]);

	return (
		<Flex w="100%" gap="5%" justifyContent="space-between" mb="12rem">
			<Flex flexDir={"column"}>
				<Flex flexDir={"column"}>
					<Text
						mb={"1.4688rem"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
					>
						Enviar {formatCurrency(imovel?.min_investment * cotas)}
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
								{enterprise?.payment_info?.bank_account}
							</Text>
						</Flex>
						<Flex flexDir={"row"} gap={"0.4rem"}>
							<Text color={"#171923"} fontSize={"0.875rem"} fontWeight={"500"}>
								Agencia:
							</Text>
							<Text fontSize={"0.875rem"} color={"#000"}>
								{enterprise?.payment_info?.branch}
							</Text>
						</Flex>
						<Flex flexDir={"row"} gap={"0.4rem"}>
							<Text color={"#171923"} fontSize={"0.875rem"} fontWeight={"500"}>
								Conta:
							</Text>
							<Text fontSize={"0.875rem"} color={"#000"}>
								{enterprise?.payment_info?.account}
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
