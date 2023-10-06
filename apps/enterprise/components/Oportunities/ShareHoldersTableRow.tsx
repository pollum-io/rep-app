import React, { useMemo } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { formatCurrency } from "ui";
import { fetchGetDocumentLinks } from "services";

interface IShareHoldersTableRow {
	name: string;
	cpfOrCnpj: string;
	totalInvested: number;
	totalCotas: number;
	totalPaid: number;
	numInstallments: number;
	status: string;
	documentKey: string;
	token: string;
}

export const ShareHoldersTableRow: React.FC<IShareHoldersTableRow> = ({
	name,
	cpfOrCnpj,
	totalInvested,
	totalCotas,
	totalPaid,
	numInstallments,
	status,
	documentKey,
	token,
}) => {
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
					return {
						bg: "#FED7D7",
						color: "#E53E3E",
						statusText: `Pagamento pendente`,
						action: "Realizar pagamento",
					};
				// if (unpaidInstallments === 1) {
				// 	return {
				// 		bg: "#FED7D7",
				// 		color: "#E53E3E",
				// 		statusText: "Atrasado",
				// 		action: "Realizar pagamento",
				// 	};
				// } else if (unpaidInstallments > 1) {
				// 	return {
				// 		bg: "#FED7D7",
				// 		color: "#E53E3E",
				// 		statusText: `${unpaidInstallments} parcelas atrasadas`,
				// 		action: "Realizar pagamento",
				// 	};
				// }

				default:
					return { bg: "white", color: "black" };
			}
		};

		return getStatusColor;
	}, []);

	const getDocLinks = async () => {
		const req = await fetchGetDocumentLinks(token, documentKey);
		window.open(req?.original_file_url, "_blank");
	};

	return (
		<Flex
			justifyContent={"space-between"}
			w={"100%"}
			px={"1rem"}
			py={"0.5rem"}
			gap={"1.5rem"}
			borderBottom={"1px solid #E2E8F0"}
		>
			<Flex flexDir={"column"} w={"11.25rem"}>
				<Text
					fontSize={"0.75rem"}
					color={"#171923"}
					fontWeight={"500"}
					textOverflow={"ellipsis"}
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					maxWidth={"11.25rem"}
				>
					{name}
				</Text>
				<Text fontSize={"0.75rem"} color={"#171923"} fontWeight={"400"}>
					{cpfOrCnpj}
				</Text>
			</Flex>
			<Flex flexDir={"column"} w={"8.75rem"}>
				<Text
					fontSize={"0.75rem"}
					color={"#171923"}
					fontWeight={"500"}
					textOverflow={"ellipsis"}
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					maxWidth={"8.75rem"}
				>
					{formatCurrency(totalInvested)}
				</Text>
				<Text fontSize={"0.75rem"} color={"#171923"} fontWeight={"400"}>
					{totalCotas} cotas
				</Text>
			</Flex>
			<Flex flexDir={"column"} w={"9.75rem"}>
				<Text
					fontSize={"0.75rem"}
					color={"#171923"}
					fontWeight={"500"}
					textOverflow={"ellipsis"}
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					maxWidth={"9.75rem"}
				>
					{formatCurrency(totalPaid)}
				</Text>
				<Text fontSize={"0.75rem"} color={"#171923"} fontWeight={"400"}>
					{totalCotas} de {numInstallments}
				</Text>
			</Flex>
			<Flex flexDir={"column"} w={"9.5rem"} justifyContent={"center"}>
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
			<Flex
				flexDir={"column"}
				w={"6.25rem"}
				justifyContent={"center"}
				alignItems={"center"}
				onClick={() => getDocLinks()}
				cursor={"pointer"}
			>
				<Text
					fontSize={"0.75rem"}
					color={"#007D99"}
					fontWeight={"500"}
					textOverflow={"ellipsis"}
					whiteSpace={"nowrap"}
					overflow={"hidden"}
					maxWidth={"6.25rem"}
				>
					Visualizar
				</Text>
			</Flex>
		</Flex>
	);
};
