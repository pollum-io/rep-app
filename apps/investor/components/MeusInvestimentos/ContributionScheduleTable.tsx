import { Flex, Text, Img, Button } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { formatCurrency } from "ui/utils/BRCurrency";
import { formatDate, formatFullDate } from "../../utils/formatDate";

// const data = [
// 	{
// 		data: "02 de Dezembro de 2025",
// 		aporte: "R$ 90.000,00",
// 		status: "Paga",
// 		acao: "Baixar comprovante",
// 	},
// 	{
// 		data: "02 de Janeiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "Pagamento pendente",
// 		acao: "Realizar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// 	{
// 		data: "02 de Fevereiro de 2026",
// 		aporte: "R$ 90.000,00",
// 		status: "A vencer",
// 		acao: "Adiantar pagamento",
// 	},
// ];

interface IValueTable {
	isCronograma?: boolean;
	data?: any; //TODO
	total_invested: number;
}

export const ContributionScheduleTable: FunctionComponent<IValueTable> = ({
	isCronograma,
	total_invested,
	data,
}) => {
	const getStatusColorAndText = useMemo(() => {
		const getStatusColor = (status: string) => {
			switch (status) {
				case "CONFIRMED":
					return {
						bg: "#E4F2F3",
						color: "#00576B",
						statusText: "Pago",
						action: "Realizar pagamento",
					};
				case "OVERDUE":
					return {
						bg: "#FED7D7",
						color: "#E53E3E",
						statusText: "Atrasado",
						action: "Realizar pagamento",
					};
				case "PENDING":
					return {
						bg: "#F0E8FF",
						color: "#6E40E7",
						statusText: "Em aberto",
						action: "Realizar pagamento",
					};
				default:
					return {
						bg: "#FEEBCB",
						color: "#B7791F",
						statusText: "Em Analise	",
						action: "Realizar pagamento",
					};
			}
		};

		return getStatusColor;
	}, []);

	const renderRows = () => {
		return data?.data?.disbursement_schedule?.map((item, index) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.5rem"}
				w={"100%"}
			>
				<Flex flex="1.1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{formatFullDate(item.date)}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"#171923"}>
						{formatCurrency(item.value)}
					</Text>
				</Flex>
				<Flex flex="1.2" alignItems="center">
					<Button
						p={"0.5rem"}
						w={"9.125rem"}
						h={"1.25rem"}
						textAlign={"center"}
						borderRadius={"2.625rem"}
						fontSize={"0.75rem"}
						bg={getStatusColorAndText(item?.status)?.bg}
						color={getStatusColorAndText(item?.status)?.color}
						fontWeight={"500"}
						_hover={{}}
					>
						{getStatusColorAndText(item?.status)?.statusText}
					</Button>
				</Flex>
				<Flex flex="1">
					<Button
						p={"0"}
						w={"max"}
						h={"1.25rem"}
						borderRadius={"2.625rem"}
						fontSize={"0.75rem"}
						bg={"transparent"}
						color={"#007D99"}
						fontWeight={"500"}
						_hover={{}}
						m={"0"}
					>
						{getStatusColorAndText(item?.status)?.action}
					</Button>
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex
			border={"1px solid #E2E8F0"}
			flexDir={"column"}
			w={"42.5rem"}
			borderRadius="0.75rem"
		>
			<Flex
				id="table-header"
				bg={"#1789A3"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderTopRadius="0.75rem"
			>
				<Flex flex="1.1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Data{" "}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={"500"}
						color={"white"}
						pr={"1"}
					>
						Aporte
					</Text>
					<Img w={"1rem"} src="/icons/info-circle-gray.svg" />
				</Flex>
				<Flex flex="1.2">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Status{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Ação{" "}
					</Text>
				</Flex>
			</Flex>
			{renderRows()}
			<Flex
				id="table-header"
				bg={"#1789A3"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderBottomRadius="0.75rem"
			>
				<Flex flex="1.4">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						Total
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						{formatCurrency(total_invested)}
					</Text>
				</Flex>
				<Flex flex={"1"} />
				<Flex flex={"1"} />
				<Flex flex={"1"} />
			</Flex>
		</Flex>
	);
};
