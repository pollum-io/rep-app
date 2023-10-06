import { Flex, Text, Button, Img } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { useRouter } from "next/router";
import { formatCurrency } from "ui/utils/BRCurrency";
import { motion } from "framer-motion";
import {
	formatCPF,
	formatDateOnlyDayMonthYear,
	formatDateOnlyMonthYear,
} from "ui";
import { fetchGetDocumentLinks } from "services";

const MotionFlex = motion(Flex);

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface IShareholders {
	oportunityImage: string;
	oportunityName: string;
	oportunityType: string;
	oportunityUrl: string;
	investorName: string;
	documentKey: string;
	investorCpf: string;
	totalInvested: number;
	cotas: number;
	totalPaid: number;
	paidInstallments: number;
	unpaidInstallments: number;
	numberOfInstallments: number;
	status: string;
	token: string;
}

export const ShareholdersTableRow: FunctionComponent<IShareholders> = ({
	oportunityImage,
	oportunityName,
	oportunityType,
	investorName,
	documentKey,
	investorCpf,
	totalInvested,
	cotas,
	totalPaid,
	paidInstallments,
	numberOfInstallments,
	status,
	oportunityUrl,
	unpaidInstallments,
	token,
}) => {
	const { push } = useRouter();

	const getStatusColorAndText = useMemo(() => {
		const getStatusColor = (status: string) => {
			switch (status) {
				case "Concluded":
					return {
						bg: "#E4F2F3",
						color: "#00576B",
						statusText: "Concluído",
						action: "Ver detalhes",
					};
				case "PendingPayment":
					return {
						bg: "#FED7D7",
						color: "#E53E3E",
						statusText: "Pagamento pendente",
						action: "Realizar pagamento",
					};
				case "PendingSignature":
					return {
						bg: "#F0E8FF",
						color: "#6E40E7",
						statusText: "Assinatura pendente",
						action: "Assinar contrato",
					};
				case "InProgress":
					return {
						bg: "#FEEBCB",
						color: "#B7791F",
						statusText: "Em dia",
						action: "Ver aportes e retornos",
					};
				case "Overdue":
					if (unpaidInstallments === 1) {
						return {
							bg: "#FED7D7",
							color: "#E53E3E",
							statusText: "Atrasado",
							action: "Realizar pagamento",
						};
					} else if (unpaidInstallments > 1) {
						return {
							bg: "#FED7D7",
							color: "#E53E3E",
							statusText: `${unpaidInstallments} parcelas atrasadas`,
							action: "Realizar pagamento",
						};
					}
				default:
					return { bg: "white", color: "black" };
			}
		};

		return getStatusColor;
	}, [unpaidInstallments]);

	const totalInvestColor = useMemo(() => {
		if (status === "PendingSignature" || status === "PendingPayment") {
			return "#CBD5E0";
		} else {
			return "#171923";
		}
	}, [status]);

	const getDocLinks = async () => {
		const req = await fetchGetDocumentLinks(token, documentKey);
		window.open(req?.original_file_url, "_blank");
	};

	const statusAction = getStatusColorAndText(status)?.action;
	const isAssinarContrato = statusAction === "Assinar contrato";
	const isRealizarPagamento = statusAction === "Realizar pagamento";
	const isVerAportesRetornos = statusAction === "Ver aportes e retornos";

	// const handleButtonClick = () => {
	// 	if (isAssinarContrato) {
	// 		window.open(props?.url_unsigned_document, "_blank");
	// 	} else if (isRealizarPagamento) {
	// 		push({
	// 			pathname: `/pagamento/`,
	// 			query: { id: props?.contributionId },
	// 		});
	// 	} else if (isVerAportesRetornos) {
	// 		props.setEmpreendimento(props);
	// 		props.modalOpen();
	// 	}
	// };

	return (
		<MotionFlex
			py="0.875rem"
			px="1rem"
			h={"4.1875rem"}
			justifyContent="space-between"
			alignItems="center"
			initial="hidden"
			animate="visible"
			borderRadius={"0.75rem"}
			mb={"0.75rem"}
			cursor={"pointer"}
			_hover={{
				boxShadow:
					"0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10);",
			}}
			w={"100%"}
		>
			<Flex
				flex="1.9"
				flexDir={"row"}
				alignItems={"center"}
				onClick={() =>
					push({
						pathname: `/oportunidades/${oportunityUrl}`,
					})
				}
			>
				<Flex h={"max"} mr={"0.75rem"} position="relative">
					<Img
						w={"2.4375rem"}
						h={"2.4375rem"}
						objectFit={"cover"}
						borderLeftRadius={"0.75rem"}
						src={`${url}/file/${oportunityImage}`}
					/>
					<Flex
						position="absolute"
						top={0}
						left={0}
						width="100%"
						height="100%"
						display="flex"
						alignItems="center"
						justifyContent="center"
						opacity={0}
						transition="opacity 0.3s ease"
						bgColor="rgba(0, 0, 0, 0.5)"
						borderRadius="0.75rem"
						_hover={{ opacity: 1 }}
					>
						<Img src="/icons/export.svg" />
					</Flex>
				</Flex>
				<Flex flexDir={"column"}>
					<Text
						w={"max"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={"#171923"}
					>
						{oportunityName.length >= 27
							? `${oportunityName.slice(0, 27)}...`
							: oportunityName}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						{oportunityType}
					</Text>
				</Flex>
			</Flex>
			<Flex
				// onClick={
				// 		 () =>
				// 				props.setEmpreendimento(props)
				// }
				flex={"3.8"}
			>
				<Flex flex="1.5" flexDir={"column"}>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{investorName}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{formatCPF(investorCpf)}
					</Text>
				</Flex>
				<Flex flex="1" flexDir={"column"}>
					<Text fontSize={"0.75rem"} color={totalInvestColor}>
						{formatCurrency(totalInvested)}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"#2D3748"}>
						{cotas} cotas
					</Text>
				</Flex>
				<Flex flex="1.3" flexDir={"column"}>
					<Text fontSize={"0.75rem"} color={"#171923"} fontWeight={"500"}>
						{formatCurrency(totalPaid)}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						{paidInstallments} de {numberOfInstallments}
					</Text>
				</Flex>
			</Flex>
			<Flex
				flex="2"
				as={"a"}
				// href={isAssinarContrato ? props?.url_unsigned_document : null}
				// onClick={() => handleButtonClick()}
				target="_blank"
				h={"100%"}
				alignItems={"center"}
			>
				<Flex flex="1">
					<Button
						p={"0.5rem"}
						w={"9.125rem"}
						h={"1.25rem"}
						textAlign={"center"}
						borderRadius={"2.625rem"}
						fontSize={"0.75rem"}
						bg={getStatusColorAndText(status)?.bg}
						color={getStatusColorAndText(status)?.color}
						fontWeight={"500"}
						_hover={{}}
					>
						{getStatusColorAndText(status)?.statusText}
					</Button>
				</Flex>
				<Flex flex="1">
					<Button
						as={"a"}
						target="_blank"
						p={"0.5rem"}
						w={"8.375rem"}
						h={"1.25rem"}
						textAlign={"center"}
						borderRadius={"2.625rem"}
						fontSize={"0.75rem"}
						bg={"transparent"}
						color={"#007D99"}
						fontWeight={"500"}
						_hover={{}}
						// href={isAssinarContrato ? props?.url_unsigned_document : null}
						onClick={() => getDocLinks()}
					>
						Visualizar{" "}
					</Button>
				</Flex>
			</Flex>
		</MotionFlex>
	);
};
