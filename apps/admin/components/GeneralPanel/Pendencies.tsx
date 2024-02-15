import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";

interface IPendencies {
	pendenciesData: unknown;
}

export const Pendencies: React.FC<IPendencies> = ({ pendenciesData }) => {
	return (
		<Flex
			w={"23.875rem"}
			px={"1.5rem"}
			py={"1rem"}
			flexDir={"column"}
			bg={"#fff"}
			borderRadius={"1.25rem"}
			h={"max"}
		>
			<Text
				color={"#171923"}
				fontSize={"1.125rem"}
				fontWeight={"500"}
				mb={"1.5rem"}
			>
				Pendências
			</Text>
			<Flex flexDir={"column"} gap={"0.25rem"}>
				<Flex>
					<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
						Pagamentos pendentes
					</Text>
					<Img src="/logos/info.svg" />
				</Flex>
				<Text color={"#E53E3E"} fontSize={"1.125rem"} fontWeight={"600"}>
					{pendenciesData?.pending_payments}
				</Text>
			</Flex>
			<Flex flexDir={"column"} gap={"0.25rem"}>
				<Flex>
					<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
						Investimentos pendentes
					</Text>
					<Img src="/logos/info.svg" />
				</Flex>
				<Text color={"#E53E3E"} fontSize={"1.125rem"} fontWeight={"600"}>
					{pendenciesData?.pending_investments}
				</Text>
			</Flex>
		</Flex>
	);
};
