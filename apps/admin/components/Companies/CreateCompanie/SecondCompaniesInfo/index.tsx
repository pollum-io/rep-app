import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { InputComponent } from "../CompanieFormCreateInput/InputComponent";
import { useCreateCompanieSteps } from "../../../../hooks/useCreateCompanieSteps";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";

interface ISecondCompaniesInfo {
	onOpenModal?: any;
}

export const SecondCompaniesInfo: React.FC<ISecondCompaniesInfo> = ({
	onOpenModal,
}) => {
	const { setFirstStep, setSecondStep } = useCreateCompanieSteps();
	const { handleSaveFormData, companyFormData, setCompanyFormData } =
		useCreateCompany();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCompanyFormData({
			...companyFormData,
			[name]: value,
		});
	};

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
						onChange={handleInputChange}
						value={companyFormData.contactEmail}
					/>
					<InputComponent
						type="text"
						name="whatsapp"
						maskType="Telefone"
						width={"18.5rem"}
						label="WhatsApp"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.whatsapp}
					/>
					<InputComponent
						type="text"
						name="contactPhone"
						maskType="Telefone"
						width={"18.5rem"}
						label="Telefone de contato"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.contactPhone}
					/>
					<InputComponent
						type="text"
						name="instagram"
						width={"18.5rem"}
						label="Instagram"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.instagram}
					/>
					<InputComponent
						type="text"
						name="facebook"
						width={"18.5rem"}
						label="Página do Facebook"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.facebook}
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="text"
						name="website"
						width={"18.5rem"}
						label="Website"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.website}
					/>
					<InputComponent
						type="text"
						name="telegram"
						width={"18.5rem"}
						label="Telegram"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.telegram}
					/>
					<InputComponent
						type="text"
						name="twitter"
						width={"18.5rem"}
						label="Twitter"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.twitter}
					/>
					<InputComponent
						type="text"
						name="jusbrasil"
						width={"18.5rem"}
						label="Perfil do Jusbrasil"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.jusbrasil}
					/>
					<InputComponent
						type="text"
						name="reclame"
						width={"18.5rem"}
						label="Perfil do Reclame Aqui"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.reclame}
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
						handleSaveFormData();
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
						handleSaveFormData();
						onOpenModal();
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
