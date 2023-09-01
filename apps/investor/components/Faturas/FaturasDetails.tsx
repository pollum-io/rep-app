import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { IContribution } from "ui";

type ComponentProps = {
	contribution?: IContribution;
};

export const FaturasDetails: React.FC<ComponentProps> = ({ contribution }) => {
	console.log(contribution?.paid_installments);
	return (
		<Flex
			justifyContent={"end"}
			align={"flex-end"}
			position={"absolute"}
			bg={"white"}
			zIndex={"9999"}
			top={{
				sm: "24px",
				md: "14rem",
				lg: "13rem",
				xl: "13rem",
				"2xl": "13rem",
			}}
			left={{
				sm: "24px",
				md: "14rem",
				lg: "39%",
				xl: "40.5%",
				"2xl": "47%",
			}}
			w={"39rem"}
			px={"1.5rem"}
			py={"1rem"}
			borderRadius={"0.75rem"}
			boxShadow="0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10);"
			gap={"2.75rem"}
		>
			<Flex flexDir={"column"} gap={"0.25rem"}>
				<Flex gap={"0.5rem"}>
					<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
						Parcelas quitadas
					</Text>
					<Img src="/icons/info-circle-littlegray.svg" />
				</Flex>
				<Flex gap={"1.5"}>
					<Text fontSize={"1.125rem"} fontWeight={"600"}>
						{contribution?.num_installments}
					</Text>
					<Text fontSize={"1.125rem"}>
						de {contribution?.paid_installments}
					</Text>
				</Flex>
			</Flex>
			<Flex flexDir={"column"} gap={"0.25rem"}>
				<Flex gap={"0.5rem"}>
					<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
						Total de cotas na LIVN
					</Text>
					<Img src="/icons/info-circle-littlegray.svg" />
				</Flex>
				<Text fontSize={"1.125rem"}>{contribution?.num_cotas}</Text>
			</Flex>
			<Flex flexDir={"column"} gap={"0.25rem"}>
				<Flex gap={"0.5rem"}>
					<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
						Prazo final aportes
					</Text>
					<Img src="/icons/info-circle-littlegray.svg" />
				</Flex>
				<Text fontSize={"1.125rem"}>-</Text>
			</Flex>
		</Flex>
	);
};
