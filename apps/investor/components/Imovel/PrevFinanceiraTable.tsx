import { Flex, Text } from "@chakra-ui/react";

const data = [
	{
		periodo: "2023",
		custo: "R$ 1.000.000,00",
		receita_total: "R$ 90.000,00",
		receita_vendas: "7,81 %",
		unidades_vendidas: "1",
		fluxo_caixa: "- R$ 500.000,00",
	},
	{
		periodo: "2024",
		custo: "R$ 2.000.000,00",
		receita_total: "R$ 1.160.000,00",
		receita_vendas: "25,00 %",
		unidades_vendidas: "3",
		fluxo_caixa: "- R$ 400.000,00",
	},
	{
		periodo: "2025",
		custo: "R$ 500.000,00",
		receita_total: "R$ 2.160.000,00",
		receita_vendas: "39,06 %",
		unidades_vendidas: "5",
		fluxo_caixa: "+ R$ 1.500.000,00",
	},
	{
		periodo: "2026",
		custo: "R$ 1.000.000,00",
		receita_total: "R$ 1.060.000,00",
		receita_vendas: "28,13 %",
		unidades_vendidas: "3",
		fluxo_caixa: "+ R$ 1.300.000,00",
	},
];

const PrevFinanceiraTable = () => {
	const renderRows = () => {
		return data.map((item, index) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.75rem"}
			>
				<Flex flex="0.7" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#4BA3B7"}>
						{item.periodo}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.custo}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.receita_total}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.receita_vendas}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.unidades_vendidas}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={"400"}
						color={item.fluxo_caixa.charAt(0) === "+" ? "green" : "red"}
					>
						{item.fluxo_caixa}
					</Text>
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex
			border={"1px solid #E2E8F0"}
			flexDir={"column"}
			w={"44.125rem"}
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
						Período{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Custo (R$){" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Recita Total (R$){" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Receita total{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Un. vendidas{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						Fluxo de caixa{" "}
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
				<Flex flex="0.7">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						Total{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						4.600.000,00{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						6.400.000,00{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						100 %{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						12{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						R$ 1.900.000,00{" "}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PrevFinanceiraTable;
