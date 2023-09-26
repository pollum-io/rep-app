import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export const ImoveisTableHeader: React.FC = (props) => {
	return (
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
			<Flex flex="1.9">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Empreendimento
				</Text>
			</Flex>
			<Flex flex="1.5">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Nome e CPF{" "}
				</Text>
			</Flex>
			<Flex flex="1">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Total Investido{" "}
				</Text>
			</Flex>
			<Flex flex="1.3">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Aportes realizados{" "}
				</Text>
			</Flex>
			<Flex flex="1">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Status
				</Text>
			</Flex>
			<Flex flex="1">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Contrato
				</Text>
			</Flex>
		</Flex>
	);
};
