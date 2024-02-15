import React, { FunctionComponent } from "react";
import { Flex, Text, Progress } from "@chakra-ui/react";
import { IRegisterSteps } from "./dto";

import { BsCheck } from "react-icons/bs";
import { useCreateAdminCreateSteps } from "../../../../hooks/useCreateAdminCreateSteps";

const CreateStep: FunctionComponent<IRegisterSteps> = ({
	step,
	title,
	barPercentage,
}) => {
	return (
		<Flex gap="0.7762rem" alignItems="center">
			<Flex
				borderRadius="full"
				bgColor={barPercentage !== 0 ? "#007088" : "#EDF2F7"}
				w="1.9737rem"
				h="1.9737rem"
				justifyContent="center"
				alignItems="center"
			>
				<Text
					color={barPercentage !== 0 ? "#FFFFFF" : "#6F6C90"}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barPercentage !== 0 ? "600" : "400"}
					fontSize="0.875rem"
					lineHeight="1.25rem"
				>
					{barPercentage === 100 ? <BsCheck size={25} /> : step}
				</Text>
			</Flex>
			<Flex
				flexDirection="column"
				pt="0.1rem"
				h="100%"
				gap="0.1913rem"
				w={step === 2 ? "7.9rem" : step === 3 ? "6.2rem" : "6rem"}
			>
				<Text
					color={
						barPercentage !== 0
							? barPercentage === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barPercentage !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={"max"}
				>
					{title}
				</Text>
				<Progress
					value={barPercentage}
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

export const CreateSteps: FunctionComponent = () => {
	const {
		firstStep,
		secondStep,
		thirdStep,
		fourthStep,
		isCreateOpportunityPage,
	} = useCreateAdminCreateSteps();

	return (
		<Flex gap="3.875rem">
			<CreateStep
				step={1}
				title={isCreateOpportunityPage ? "Dados gerais" : "Perfil da empresa"}
				barPercentage={firstStep ? 50 : 100}
			/>
			<CreateStep
				step={2}
				title={
					isCreateOpportunityPage ? "Detalhamento técnico" : "Links e contatos"
				}
				barPercentage={secondStep ? 50 : firstStep ? 0 : 100}
			/>
			<CreateStep
				step={3}
				title={isCreateOpportunityPage ? "Aportes" : "Revisar e criar empresa"}
				barPercentage={thirdStep ? 50 : secondStep ? 0 : 100}
			/>
			{isCreateOpportunityPage && (
				<>
					<CreateStep
						step={4}
						title={
							isCreateOpportunityPage
								? "Visão geral"
								: "Revisar e criar empresa"
						}
						barPercentage={fourthStep ? 50 : 0}
					/>
				</>
			)}
		</Flex>
	);
};
