import React, { FunctionComponent } from "react";
import { Flex, Text, Progress } from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { ISteps } from "./stepsdto";
import { useRegister } from "../../../hooks";

const InvestStepsComponent: FunctionComponent<ISteps> = ({
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
					w={"max"}
					lineHeight="1rem"
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

export const InvestSteps: FunctionComponent = () => {
	const { firstStep, secondStep } = useRegister();
	const { t } = useTranslation();

	return (
		<Flex gap="3.875rem">
			<InvestStepsComponent
				step={1}
				title={"Confirmar dados"}
				barPercentage={firstStep ? 50 : 100}
			/>
			<InvestStepsComponent
				step={2}
				title={"Assinar contratodados"}
				barPercentage={secondStep ? 50 : firstStep ? 0 : 100}
			/>
			<InvestStepsComponent
				step={3}
				title={"Efetuar pagamento"}
				barPercentage={!firstStep && !secondStep ? 50 : 0}
			/>
		</Flex>
	);
};
