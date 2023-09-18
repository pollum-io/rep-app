import { Flex, Text, Button } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useRouter } from "next/router";
import { formatDateOnlyDayMonthYear } from "../utils";

type EmpreendimentoTable = {
	name?: string;
	id: string;
	type?: string;
	numInstallments?: number;
	numPaidInstallments?: number;
	value: number;
	date?: string;
	status: string;
	comprovante?: string;
};

const EmpreendimentoTable: FunctionComponent<EmpreendimentoTable> = ({
	name,
	id,
	type,
	numInstallments,
	numPaidInstallments,
	value,
	date,
	status,
	comprovante,
}) => {
	const { push } = useRouter();

	const getStatusColorAndText = useMemo(() => {
		const getStatusColor = (status: string) => {
			if (status === "RECEIVED") {
				return {
					bg: "#E4F2F3",
					color: "#00576B",
					statusText: "Pago",
					action: "Ver comprovante",
				};
			} else if (status === "OVERDUE") {
				return {
					bg: "#FED7D7",
					color: "#E53E3E",
					statusText: "Atrasado",
					action: "Realizar pagamento",
				};
			} else {
				return {
					bg: "#FEEBCB",
					color: "#B7791F",
					statusText: "Em aberto",
					action: "Realizar pagamento",
				};
			}
		};

		return getStatusColor;
	}, []);

	const handleButtonClick = () => {
		if (status === "RECEIVED") {
			window.open(comprovante);
		} else {
			push({
				pathname: `/pagamento/`,
				query: { id: id },
			});
		}
	};

	const renderRows = () => {
		return (
			<Flex
				px="1rem"
				h={"3.9375rem"}
				justifyContent="space-between"
				alignItems="center"
				py={"0.5rem"}
				borderRadius={"0.75rem"}
				mb={"0.75rem"}
				cursor={"pointer"}
				_hover={{
					boxShadow:
						"0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10);",
				}}
			>
				<Flex flex="1" alignItems="start" flexDir={"column"}>
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						{name}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						{type}
					</Text>
				</Flex>
				<Flex flex="0.4" alignItems="center" gap={"1"}>
					<Text fontSize={"0.875rem"} fontWeight={"600"} color={"#171923"}>
						{numPaidInstallments}
					</Text>
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						de {numInstallments}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} color={"#171923"}>
						{formatDateOnlyDayMonthYear(date)}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} color={"#171923"}>
						{formatCurrency(value)}
					</Text>
				</Flex>
				<Flex
					flex="0.8"
					alignItems="center"
					onClick={() => handleButtonClick()}
				>
					<Button
						p={"0.5rem"}
						w={"9.125rem"}
						h={"1.25rem"}
						textAlign={"center"}
						borderRadius={"2.625rem"}
						fontSize={"0.75rem"}
						bg={getStatusColorAndText(status).bg}
						color={getStatusColorAndText(status).color}
						fontWeight={"500"}
						_hover={{}}
					>
						{getStatusColorAndText(status)?.statusText}
					</Button>
				</Flex>
				<Flex
					flex="0.5"
					alignItems="center"
					onClick={() => handleButtonClick()}
				>
					<Text fontSize={"0.875rem"} color={"#007D99"} fontWeight={"500"}>
						{getStatusColorAndText(status)?.action}
					</Text>
				</Flex>
			</Flex>
		);
	};

	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem">
			{renderRows()}
		</Flex>
	);
};

export default EmpreendimentoTable;
