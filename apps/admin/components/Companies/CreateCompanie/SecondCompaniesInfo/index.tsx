import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { InputComponent } from "../CompanieFormCreateInput/InputComponent";
import { useCreateCompanieSteps } from "../../../../hooks/useRegisterSteps";

export const SecondCompaniesInfo: React.FC = () => {
	const { setFirstStep, setSecondStep } = useCreateCompanieSteps();

	return (
		<Flex flexDir={"column"}>
			<Flex w={"100%"} justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="email"
						name="contactEmail"
						width={"18.5rem"}
						label="E-mail de contato"
						placeholderText="exemplo@exemplo.com"
					/>
					<InputComponent
						type="text"
						name="whatsapp"
						width={"18.5rem"}
						label="WhatsApp"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="contactPhone"
						width={"18.5rem"}
						label="Telefone de contato"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="instagram"
						width={"18.5rem"}
						label="Instagram"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="facebook"
						width={"18.5rem"}
						label="Página do Facebook"
						placeholderText=""
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="email"
						name="telegram"
						width={"18.5rem"}
						label="Telegram"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="twitter"
						width={"18.5rem"}
						label="Twitter"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="jusbrasil"
						width={"18.5rem"}
						label="Perfil do Jusbrasil"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="reclame"
						width={"18.5rem"}
						label="Perfil do Reclame Aqui"
						placeholderText=""
					/>
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} mb={"10.875rem"} mt={"2rem"}>
				<Button
					borderRadius={"100px"}
					border={"1px solid #007D99"}
					color={"#007D99"}
					bgColor={"transparent"}
					w={"7.5rem"}
					h={"2rem"}
					fontSize={"0.875rem"}
					fontWeight={"500"}
					onClick={() => {
						setFirstStep(true);
						setSecondStep(false);
					}}
				>
					Voltar
				</Button>
				<Button
					fontSize={"0.875rem"}
					fontWeight={"500"}
					color="white"
					borderRadius={"100px"}
					w={"7.5rem"}
					h={"2rem"}
					bgColor={"#007D99"}
					onClick={() => {
						setFirstStep(false);
						setSecondStep(true);
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
