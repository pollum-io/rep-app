import React, { useEffect, useState } from "react";
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
import QRCode from "qrcode";

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
	const [qrCodeDataURL, setQRCodeDataURL] = useState<string | null>(null);
	const [qrCode, setQRCode] = useState<string | null>(null);

	const qrCodeText =
		"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"; // O texto que você deseja codificar no QR Code

	const { cotas } = useOpportunities();
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { contributionId } = useUser();

	useEffect(() => {
		const openLinkInNewTab = async () => {
			const request = await fetchContributionById(
				token,
				investor,
				contributionId
			);
			setQRCode(request?.pix_qr_corde);
			console.log(request, "req");
		};
		openLinkInNewTab();
	}, [contributionId, investor, token]);

	useEffect(() => {
		QRCode.toDataURL("", (err, dataURL) => {
			if (err) {
				console.error(err);
				return;
			}

			setQRCodeDataURL(dataURL);
		});
	}, [qrCode]);

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
						<Text color={"#fd5757"}>Vencimento: 01 jan 2024 - 19:32</Text>
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
				{qrCodeDataURL && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={qrCodeDataURL}
						alt="QR Code"
						style={{ width: "12.5rem", height: "12.5rem" }}
					/>
				)}
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
				>
					Copiar QR Code
				</Button>
			</Flex>
		</Flex>
	);
};
