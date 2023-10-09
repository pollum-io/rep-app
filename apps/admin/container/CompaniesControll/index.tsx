import { FunctionComponent } from "react";
import { Button, Flex, Img, Text, useDisclosure } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { CompaniesControll } from "../../components/Companies/CompanieControllPage/CompaniesControll";
import { useCreateCompanieSteps } from "../../hooks/useCreateCompanieSteps";
import { CreateSteps } from "../../components/Companies/CreateCompanie/CreateSteps/CreateSteps";
import { FirstCompaniesInfo } from "../../components/Companies/CreateCompanie/FirstCompaniesInfo";
import { SecondCompaniesInfo } from "../../components/Companies/CreateCompanie/SecondCompaniesInfo";
import { DrawerComponent } from "../../components/Companies/CreateCompanie/Drawer";

export const CompaniesContainer: FunctionComponent = () => {
	const {
		isCreatePage,
		firstStep,
		secondStep,
		setSecondStep,
		setFirstStep,
		setIsCreatePage,
	} = useCreateCompanieSteps();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}>
				{!isCreatePage ? (
					<CompaniesControll />
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
							>
								<Button
									bgColor={"#B1D8DF"}
									borderRadius={"6.25rem"}
									p="0.75rem"
									onClick={() => {
										setIsCreatePage(false);
										setFirstStep(false);
										setSecondStep(false);
									}}
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
									Criar empresa
								</Text>
							</Flex>
						</Flex>
						<Flex
							flexDir={"column"}
							w={"45rem"}
							justifyContent={"center"}
							alignItems={"center"}
							ml={"60%"}
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
										Dados gerais
									</Text>
									<Text
										fontSize={"0.75rem"}
										color={"#007D99"}
										fontWeight={"500"}
										transition={"0.3s"}
										_hover={{ opacity: 0.7, cursor: "pointer" }}
									>
										Cancelar criação
									</Text>
								</Flex>
								{firstStep && <FirstCompaniesInfo />}
								{secondStep && <SecondCompaniesInfo onOpenModal={onOpen} />}
								<DrawerComponent isOpen={isOpen} onClose={onClose} />
							</Flex>
						</Flex>
					</>
				)}
			</Flex>
		</DefaultTemplate>
	);
};
