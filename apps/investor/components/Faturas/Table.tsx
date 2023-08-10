import { Flex, Text, Button } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const data = [
	{
		empreendimento: "Nome do empreendimento grande pra",
		parcela: "02 de 08",
		vencimento: "01 de jan 2024",
		valor: "R$ 40.000,00",
		status: "Em aberto",
		arquivos: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		parcela: "02 de 08",
		vencimento: "01 de jan 2024",
		valor: "R$ 40.000,00",
		status: "Atrasada",
		arquivos: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		parcela: "02 de 08",
		vencimento: "01 de jan 2024",
		valor: "R$ 40.000,00",
		status: "Atrasada",
		arquivos: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		parcela: "02 de 08",
		vencimento: "01 de jan 2024",
		valor: "R$ 40.000,00",
		status: "Paga",
		arquivos: "Realizar pagamento",
	},
];

const EmpreendimentoTable: FunctionComponent = () => {
	const getStatusColor = (status?: string) => {
		switch (status) {
			case "Paga":
				return { bg: "#E4F2F3", color: "#00576B" };
			case "Atrasada":
				return { bg: "#FED7D7", color: "#E53E3E" };
			case "Em aberto":
				return { bg: "#FEEBCB", color: "#B7791F" };
			default:
				return { bg: "white", color: "black" };
		}
	};

	const renderRows = () => {
		return data.map((item, index) => (
			<Flex
				key={index}
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
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						{item.empreendimento}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						<strong>{item.parcela.substr(0, 2)}</strong>
						{item.parcela.substr(2)}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} color={"#171923"}>
						{item.vencimento}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} color={"#171923"}>
						{item.valor}
					</Text>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Button
						p={"0.5rem"}
						w={"8.375rem"}
						h={"1.25rem"}
						textAlign={"center"}
						borderRadius={"2.625rem"}
						fontSize={"0.875rem"}
						bg={getStatusColor(item.status).bg}
						color={getStatusColor(item.status).color}
						fontWeight={"500"}
						_hover={{}}
					>
						{item.status}
					</Button>
				</Flex>
				<Flex flex="0.5" alignItems="center">
					<Text fontSize={"0.875rem"} color={"#007D99"} fontWeight={"500"}>
						{item.arquivos}
					</Text>
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem">
			<Flex
				id="table-header"
				bg={"transparent"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderTopRadius="0.75rem"
				color={"#171923"}
			>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Empreendimento
					</Text>
				</Flex>
				<Flex flex="0.5">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Parcela
					</Text>
				</Flex>
				<Flex flex="0.5">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Vencimento
					</Text>
				</Flex>
				<Flex flex="0.5">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Valor
					</Text>
				</Flex>
				<Flex flex="0.5">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Status
					</Text>
				</Flex>
				<Flex flex="0.5">
					<Text fontSize={"0.875rem"} fontWeight={"500"}>
						Arquivos
					</Text>
				</Flex>
			</Flex>
			{renderRows()}
		</Flex>
	);
};

export default EmpreendimentoTable;
