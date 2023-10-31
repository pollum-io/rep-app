import { FunctionComponent, useState } from "react";
import {
	Button,
	Flex,
	Img,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { OpportuntiesInfoCards } from "../../components/Opportunities/OpportuntiesInfoCards";
import { OpportunitiesCard, OpportunitiesCards } from "ui";
import { useCreateAdminCreateSteps } from "../../hooks/useCreateAdminCreateSteps";
import { OpportunitiesControll } from "../../components/Opportunities/OpportunitiesControll";
import { CreateSteps } from "../../components/Companies/CreateCompanie/CreateSteps/CreateSteps";
import { FirstOpportunitiesInfo } from "../../components/Opportunities/FirstOpportunitiesInfo";
import { SecondOpportunitiesInfo } from "../../components/Opportunities/SecondOpportunitiesInfo";
import { ThirdOpportunitiesInfo } from "../../components/Opportunities/ThirdOpportunitiesInfo";
import { FourthOpportunitiesInfo } from "../../components/Opportunities/FourthOpportunitiesInfo";

interface IOpportunitiesControllContainer {
	token: string;
}

export const OpportunitiesControllContainer: FunctionComponent<
	IOpportunitiesControllContainer
> = ({ token }) => {
	const {
		firstStep,
		secondStep,
		thirdStep,
		fourthStep,
		setSecondStep,
		setFirstStep,
		setThirdStep,
		setFourthStep,
		setIsCreatOpportunityePage,
		isCreateOpportunityPage,
	} = useCreateAdminCreateSteps();

	const pageTitle = firstStep
		? "Dados gerais"
		: secondStep
		? "Detalhamento técnico"
		: thirdStep
		? "Aportes"
		: fourthStep
		? "Visão Geral"
		: "";

	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}>
				{!isCreateOpportunityPage ? (
					<OpportunitiesControll token={token} />
				) : (
					<>
						<Flex flexDir={"column"}>
							<Flex
								alignItems={"baseline"}
								gap={"1rem"}
								transition={"0.5s"}
								cursor={"pointer"}
								_hover={{ opacity: 0.6 }}
								w={"max"}
								onClick={() => {
									setIsCreatOpportunityePage(false);
									setFirstStep(false);
									setSecondStep(false);
									setThirdStep(false);
									setFourthStep(false);
								}}
							>
								<Button
									bgColor={"#B1D8DF"}
									borderRadius={"6.25rem"}
									p="0.75rem"
								>
									<Img src={"/logos/leftArrowBlue.svg"} />
								</Button>
								<Text
									color={"#007D99"}
									fontSize={"1.5rem"}
									fontWeight={"500"}
									mt={"1rem"}
									mb={"2rem"}
									transition={"0.5s"}
									cursor={"pointer"}
									_hover={{ opacity: 0.6 }}
								>
									Criar oportunidade
								</Text>
							</Flex>
						</Flex>
						<Flex
							flexDir={"column"}
							w={"45rem"}
							justifyContent={"center"}
							alignItems={"center"}
							ml={"20%"}
						>
							<CreateSteps />
							<Flex mt={"2.25rem"} flexDir={"column"} w={"100%"}>
								<Flex
									alignItems={"center"}
									justifyContent={"space-between"}
									w={"100%"}
									mb="1rem"
								>
									<Text
										fontWeight={"500"}
										color={"#171923"}
										fontSize={"1.125rem"}
									>
										{pageTitle}
									</Text>
									{/* {!isEditing && (
										<Text
											fontSize={"0.75rem"}
											color={"#007D99"}
											fontWeight={"500"}
											transition={"0.3s"}
											_hover={{ opacity: 0.7, cursor: "pointer" }}
											onClick={() => {
												onOpennWarnModal();
											}}
										>
											Cancelar criação
										</Text>
									)} */}
								</Flex>
								{/* <WarnCancelCreationModal
									isOpen={isOpenWarnModal}
									onClose={onCloseWarnModal}
								/> */}

								{isCreateOpportunityPage && firstStep && (
									<FirstOpportunitiesInfo token={token} />
								)}
								{isCreateOpportunityPage && secondStep && (
									<SecondOpportunitiesInfo token={token} />
								)}
								{isCreateOpportunityPage && thirdStep && (
									<ThirdOpportunitiesInfo token={token} />
								)}
								{isCreateOpportunityPage && fourthStep && (
									<FourthOpportunitiesInfo token={token} />
								)}
							</Flex>
						</Flex>
					</>
				)}
			</Flex>
		</DefaultTemplate>
	);
};
