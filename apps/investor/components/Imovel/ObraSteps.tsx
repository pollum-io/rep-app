import React, { FunctionComponent, useMemo } from "react";
import { Flex, Text, Progress } from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { IObraSteps } from "../../dtos/IObraSteps";

export const ObraSteps: FunctionComponent<IObraSteps> = ({
	title,
	barPercentage,
	titleWidth,
}) => {
	const barStatus = useMemo(() => {
		let status: number;

		if (barPercentage === "Não iniciado") {
			status = 0;
		} else if (barPercentage === "Em Andamento") {
			status = 50;
		} else if (barPercentage === "Finalizado") {
			status = 100;
		}
		return status;
	}, [barPercentage]);

	const barSteps = useMemo(() => {
		let steps: number;

		switch (title) {
			case "Em desenvolvimento":
			case "Alvará solicitado":
			case "Memorial em elaboração":
				steps = 1;
				break;
			case "Protocolado na Prefeitura":
			case "Sob análise na Prefeitura":
			case "Memorial protocolado/ sob análise do R.I":
				steps = 2;
				break;
			case "Sob analise da Prefeitura":
			case "Alvará expedido":
			case "Em cumprimento das exigências do R.I":
				steps = 3;
				break;
			case "Aprovado":
			case "Exigências cumpridas/sob análise do R.I":
				steps = 4;
				break;
			case "Aprovado":
			case "Memorial registrado":
				steps = 5;
				break;
			default:
				steps = 0; // Valor padrão caso nenhum dos casos seja correspondido
		}

		return steps;
	}, [title]);

	return (
		<Flex gap="0.7762rem" alignItems="center" pb={"1rem"}>
			<Flex
				borderRadius="full"
				bgColor={barStatus !== 0 ? "#007088" : "#EDF2F7"}
				w="1.9737rem"
				h="1.9737rem"
				justifyContent="center"
				alignItems="center"
			>
				<Text
					color={barStatus !== 0 ? "#FFFFFF" : "#6F6C90"}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "600" : "400"}
					fontSize="0.875rem"
					lineHeight="1.25rem"
				>
					{barStatus === 100 ? <BsCheck size={25} /> : barSteps}
				</Text>
			</Flex>
			<Flex
				flexDirection="column"
				pt="0.1rem"
				h="100%"
				gap="0.1913rem"
				w={barSteps === 2 ? "7.9rem" : barSteps === 3 ? "6.2rem" : "6rem"}
			>
				<Text
					color={
						barStatus !== 0
							? barStatus === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={titleWidth ? titleWidth : "8rem"}
				>
					{title}
				</Text>
				<Progress
					value={barStatus}
					borderRadius="2.3223rem"
					w="5.695rem"
					h="0.3481rem"
					bgColor="#EDF2F7"
					className="percentage"
				/>
			</Flex>
		</Flex>
	);
};
