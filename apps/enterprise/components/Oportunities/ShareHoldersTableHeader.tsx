import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export const ShareHoldersTableHeader: React.FC = () => {
	return (
		<Flex
			w={"100%"}
			bg={"#1789A3"}
			px={"1rem"}
			py={"0.75rem"}
			gap={"1.5rem"}
			borderTopRadius={"0.75rem"}
		>
			<Text
				w={"11.25rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Nome e CPF
			</Text>
			<Text
				w={"8.75rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Total Investido
			</Text>
			<Text
				w={"9.75rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Aportes realizados
			</Text>
			<Text
				w={"9.5rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Status
			</Text>
			<Text
				w={"6.25rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Contrato
			</Text>
		</Flex>
	);
};
