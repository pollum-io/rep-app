import React, { useState } from "react";
import { Flex, Img, Input, Select, Text } from "@chakra-ui/react";

type ComponentProps = {
	data: unknown;
	index: number;
};

export const PrevFinanceiraTable: React.FC<ComponentProps> = ({ index }) => {
	const [additionalInputs, setAdditionalInputs] = useState([""]);

	const handleRemoveInput = (index: number) => {
		if (additionalInputs.length > 1) {
			const newInputs = [...additionalInputs];
			newInputs.splice(index, 1);
			setAdditionalInputs(newInputs);
		}
	};

	return (
		<Flex flexDir={"column"} gap={"0.75rem"} mb={"1.5rem"}>
			<Flex
				w={"45rem"}
				p={"1rem"}
				borderRadius={"0.375rem"}
				border={"1px solid #E2E8F0"}
				bgColor={"rgba(255, 255, 255, 0.48)"}
			>
				<Flex alignItems={"center"}>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Ano
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36))"}
							border={"1px solid #E2E8F0"}
							w={"7.5rem"}
							h={"2rem"}
						>
							<option value="option1">2021</option>
							<option value="option2">2022</option>
							<option value="option3">2023</option>
						</Select>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Custo (R$)
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"7.6875rem"}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Receita total (R$)
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"7.6875rem"}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Un. vendidas
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"4.8125rem"}
						/>
					</Flex>
					<Img
						transition={"0.5s"}
						_hover={{ cursor: "pointer", opacity: 0.6 }}
						src={"/logos/trash.svg"}
						mt={"1.5rem"}
						onClick={() => handleRemoveInput(index)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
