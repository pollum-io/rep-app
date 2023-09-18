import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { formatDateBirthday } from "../../utils/formatDate";
import { IContribution } from "ui";
import { formatCurrency } from "ui/utils/BRCurrency";

type ComponentProps = {
	contribution: IContribution;
};

export const ResumoFaturasComponent: React.FC<ComponentProps> = ({
	contribution,
}) => {
	let isMozilla = false;
	if (typeof window !== "undefined") {
		isMozilla = /firefox/i.test(window.navigator.userAgent);
	}
	return (
		<Flex flexDir={"column"}>
			<Text
				color={"#171923"}
				fontWeight={"600"}
				fontSize={"1.5rem"}
				mb={"2rem"}
			>
				Resumo de faturas
			</Text>
			<Flex gap={"1.5rem"}>
				<Flex
					flexDir={"column"}
					gap={"0.75rem"}
					px={"1.5rem"}
					py={"1rem"}
					w={"27.125rem"}
					h={"max"}
					border={"1px solid #EDF2F7"}
					borderRadius={"0.75rem"}
				>
					<Text fontSize={"0.875rem"} color={"#1A202C"}>
						Valor de todas as faturas abertas
					</Text>
					<Text color={"#865DF0"} fontWeight={"600"} fontSize={"1.5rem"}>
						{contribution?.amount_open_invoices
							? formatCurrency(contribution?.amount_open_invoices)
							: "-"}
					</Text>
					<Text color={"#718096"} fontSize={"0.75rem"}>
						Efetue o pagamento conforme as datas de vencimento para evitar
						multas e garantir o investimento.
					</Text>
				</Flex>
				<Flex
					flexDir={"column"}
					px={"1.5rem"}
					py={"1rem"}
					w={"12.8125rem"}
					border={"1px solid #EDF2F7"}
					borderRadius={"0.75rem"}
					gap={"0.5rem"}
				>
					<Img w={"3.8125rem"} src="/icons/proxima-fatura.svg" />
					<Flex gap={"0.5rem"}>
						<Text fontSize={"0.875rem"} color={"#1A202C"}>
							Próxima fatura
						</Text>
						<Img src="/icons/info-circle-littlegray.svg" />
					</Flex>
					<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
						{contribution?.next_invoice !== "-"
							? formatDateBirthday(contribution?.next_invoice)
							: "-"}
					</Text>
				</Flex>
				<Flex
					flexDir={"column"}
					px={"1.5rem"}
					py={"1rem"}
					w={"12.8125rem"}
					border={"1px solid #EDF2F7"}
					borderRadius={"0.75rem"}
					gap={"0.5rem"}
				>
					<Img w={"3.8125rem"} src="/icons/ultimo-pagamento.svg" />
					<Flex gap={"0.5rem"} w={isMozilla ? "11rem" : "max"}>
						<Text fontSize={"0.875rem"} color={"#1A202C"}>
							Último pagamento{" "}
						</Text>
						<Img src="/icons/info-circle-littlegray.svg" />
					</Flex>
					<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
						{contribution?.last_payment !== "-"
							? formatDateBirthday(contribution?.last_payment)
							: "-"}
					</Text>
				</Flex>
				<Flex
					flexDir={"column"}
					px={"1.5rem"}
					py={"1rem"}
					w={"13.8125rem"}
					border={"1px solid #EDF2F7"}
					borderRadius={"0.75rem"}
					gap={"0.5rem"}
				>
					<Img w={"3.8125rem"} src="/icons/contratos-pendentes.svg" />
					<Flex gap={"0.5rem"} w={isMozilla ? "12rem" : "max"}>
						<Text fontSize={"0.875rem"} color={"#1A202C"}>
							Contratos pendentes{" "}
						</Text>
						<Img src="/icons/info-circle-littlegray.svg" />
					</Flex>
					<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
						{contribution?.pendingContracts
							? contribution?.pendingContracts
							: "0"}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
