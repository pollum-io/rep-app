import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";

export const ImoveisTableHeader: React.FC = (props) => {
	return (
		<Flex
			id="table-header"
			bg={"transparent"}
			pr="1rem"
			py={"0.75rem"}
			justifyContent="space-between"
			alignItems="center"
			borderTopRadius="0.75rem"
			color={"#171923"}
		>
			<Flex flex="1.5">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Empreendimento
				</Text>
			</Flex>
			<Flex flex="0.7">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Início invest.{" "}
				</Text>
			</Flex>
			<Flex flex="0.8">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Total Investido{" "}
				</Text>
			</Flex>
			<Flex flex="0.6">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Conclusão{" "}
				</Text>
			</Flex>
			<Flex flex="0.9" gap={"0.25rem"}>
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Lucratividade{" "}
				</Text>
				<Img src="/icons/info-circle-littlegray.svg" />
			</Flex>

			<Flex flex="1">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Status
				</Text>
			</Flex>
			<Flex flex="1">
				<Text fontSize={"0.875rem"} fontWeight={"500"}>
					Ação
				</Text>
			</Flex>
		</Flex>
	);
};
