import { Flex, Text, Img } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const data = [
	{ ano: "2023", mes: "Fevereiro", aporte: "R$ 90.000,00" },
	{ ano: "2023", mes: "Março", aporte: "R$ 85.000,00" },
	{ ano: "2023", mes: "Abril", aporte: "R$ 95.000,00" },
	{ ano: "2023", mes: "Maio", aporte: "R$ 100.000,00" },
	{ ano: "2023", mes: "Junho", aporte: "R$ 80.000,00" },
	{ ano: "2023", mes: "Julho", aporte: "R$ 75.000,00" },
	{ ano: "2023", mes: "Agosto", aporte: "R$ 90.000,00" },
	{ ano: "2023", mes: "Setembro", aporte: "R$ 110.000,00" },
	{ ano: "2023", mes: "Outubro", aporte: "R$ 120.000,00" },
	{ ano: "2023", mes: "Novembro", aporte: "R$ 105.000,00" },
	{ ano: "2023", mes: "Dezembro", aporte: "R$ 95.000,00" },
	{ ano: "2024", mes: "Janeiro", aporte: "R$ 100.000,00" },
	{ ano: "2024", mes: "Fevereiro", aporte: "R$ 110.000,00" },
	{ ano: "2024", mes: "Março", aporte: "R$ 115.000,00" },
	{ ano: "2024", mes: "Abril", aporte: "R$ 120.000,00" },
	{ ano: "2024", mes: "Maio", aporte: "R$ 125.000,00" },
	{ ano: "2024", mes: "Junho", aporte: "R$ 130.000,00" },
];

interface IValueTable {
	isCronograma?: boolean;
}

const Table: FunctionComponent<IValueTable> = ({ isCronograma }) => {
	const renderRows = () => {
		return data.map((item, index) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.5rem"}
			>
				<Flex flex="0.7" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#4BA3B7"}>
						{item.ano}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.mes}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={isCronograma ? "400" : "500"}
						color={"#171923"}
					>
						{isCronograma ? item.aporte : `+ ${item.aporte}`}
					</Text>
					<Img src="/icons/info-circle-gray.svg" />
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex
			border={"1px solid #E2E8F0"}
			flexDir={"column"}
			w={"21.2rem"}
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
				<Flex flex="0.7">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Ano
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Mês
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
					<Img src="/icons/info-circle-gray.svg" />
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
				<Flex flex="0.7">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						Total
					</Text>
				</Flex>
				<Flex flex={"1"} />
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						R$ 832.658,88{" "}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Table;
