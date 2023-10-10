import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { InputComponent } from "../CompanieFormCreateInput/InputComponent";
import { useCreateCompanieSteps } from "../../../../hooks/useCreateCompanieSteps";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";
import { fetchEnterpriseById } from "services";
import { useQuery } from "react-query";

interface ISecondCompaniesInfo {
	onOpenModal?: any;
}

export const SecondCompaniesInfo: React.FC<ISecondCompaniesInfo> = ({
	onOpenModal,
}) => {
	const { setFirstStep, setSecondStep } = useCreateCompanieSteps();
	const {
		handleSaveFormData,
		companyFormData,
		setCompanyFormData,
		entepriseId,
		isEditing,
	} = useCreateCompany();

	const { data, isLoading, error } = useQuery(
		["enterpriseById"],
		async () =>
			await fetchEnterpriseById(
				entepriseId,
				"livn_auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGJiZDYyN2ViNmE5YTgzNDQ1MzNjMyIsImVtYWlsIjoibGl2bkBwb2xsdW0uaW8iLCJpbnZlc3Rvcl9wZiI6bnVsbCwiaW52ZXN0b3JfcGoiOm51bGwsImVudGVycHJpc2UiOiI2NDBhMjFlMjJmZTI0ZWVjN2FiNWViMDkiLCJpYXQiOjE2OTY4NTM0NjQsImV4cCI6MTY5NjkzOTg2NH0.wYxJ0qOTYNinIM864UgS7_eLeipFghgcxO9jfZCTLKY; Max-Age=604800; Domain=localhost; Path=/; HttpOnly; Secure; SameSite=None"
			)
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCompanyFormData({
			...companyFormData,
			[name]: value,
		});
	};
	console.log(companyFormData, "companyFormData");
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
						value={
							isEditing
								? data?.email
								: companyFormData.social_media?.contactEmail
						}
					/>
					<InputComponent
						type="text"
						name="whatsapp"
						maskType="Telefone"
						width={"18.5rem"}
						label="WhatsApp"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.whatsapp
								: companyFormData?.social_media?.whatsapp
						}
					/>
					<InputComponent
						type="text"
						name="contactPhone"
						maskType="Telefone"
						width={"18.5rem"}
						label="Telefone de contato"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.telephone
								: companyFormData?.social_media?.contactPhone
						}
					/>
					<InputComponent
						type="text"
						name="instagram"
						width={"18.5rem"}
						label="Instagram"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.instagram
								: companyFormData?.social_media?.instagram
						}
					/>
					<InputComponent
						type="text"
						name="facebook"
						width={"18.5rem"}
						label="Página do Facebook"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.facebook
								: companyFormData?.social_media?.facebook
						}
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
						value={
							isEditing
								? data?.social_media?.site_url
								: companyFormData?.social_media?.website
						}
					/>
					<InputComponent
						type="text"
						name="telegram"
						width={"18.5rem"}
						label="Telegram"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.telegram
								: companyFormData?.social_media?.telegram
						}
					/>
					<InputComponent
						type="text"
						name="twitter"
						width={"18.5rem"}
						label="Twitter"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.twitter
								: companyFormData?.social_media?.twitter
						}
					/>
					<InputComponent
						type="text"
						name="jusbrasil"
						width={"18.5rem"}
						label="Perfil do Jusbrasil"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.jusbrasil
								: companyFormData?.social_media?.jusbrasil
						}
					/>
					<InputComponent
						type="text"
						name="reclame"
						width={"18.5rem"}
						label="Perfil do Reclame Aqui"
						placeholderText=""
						onChange={handleInputChange}
						value={
							isEditing
								? data?.social_media?.reclame
								: companyFormData?.social_media?.reclame
						}
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
