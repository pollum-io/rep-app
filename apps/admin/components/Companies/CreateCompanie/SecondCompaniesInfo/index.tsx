import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { InputComponent } from "../CompanieFormCreateInput/InputComponent";
import { useCreateCompanieSteps } from "../../../../hooks/useCreateCompanieSteps";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";
import { fetchEnterpriseById } from "services";
import { useQuery } from "react-query";
import { PersistentFramework } from "ui";

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
				"6525aff783f44e9898f3b9c4",
				"livn_auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGJiZDYyN2ViNmE5YTgzNDQ1MzNjMyIsImVtYWlsIjoibGl2bkBwb2xsdW0uaW8iLCJpbnZlc3Rvcl9wZiI6bnVsbCwiaW52ZXN0b3JfcGoiOm51bGwsImVudGVycHJpc2UiOiI2NDBhMjFlMjJmZTI0ZWVjN2FiNWViMDkiLCJpYXQiOjE2OTY4NTM0NjQsImV4cCI6MTY5NjkzOTg2NH0.wYxJ0qOTYNinIM864UgS7_eLeipFghgcxO9jfZCTLKY; Max-Age=604800; Domain=localhost; Path=/; HttpOnly; Secure; SameSite=None"
			),
		{
			onSuccess: (data) => {
				if (isEditing && !isLoading) {
					PersistentFramework.add("formData", JSON.stringify(data));
					setCompanyFormData({
						...data,
						name: data?.enterprise_name || "",
						email: data?.email || "",
						localizacao: data?.address?.neighborhood || "",
						cnpj: data?.cnpj || "",
						logo: data?.enterprise_logo || null,
						banner: data?.enterprise_banner || null,
						description: data?.description || "",
						companyMember: data?.team || [],
						contact_number: data?.contact_number || "",
						enterprise_info: {
							delivered_enterprises:
								data?.enterprise_info?.delivered_enterprises || "",
							in_progress: data?.enterprise_info?.in_progress || "",
							vgv: data?.enterprise_info?.total_vgv || "",
						},
						social_media: {
							contactEmail: data?.social_media?.email || "",
							whatsapp: data?.social_media?.whatsapp || "",
							contactPhone: data?.social_media?.telephone || "",
							instagram: data?.social_media?.instagram || "",
							facebook: data?.social_media?.facebook || "",
							telegram: data?.social_media?.telegram || "",
							twitter: data?.social_media?.twitter || "",
							jusbrasil: data?.social_media?.jusbrasil || "",
							website: data?.social_media?.site_url || "",
							reclame: data?.social_media?.reclame || "",
						},
					});
				}
			},
		}
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name.includes(".")) {
			const nameParts = name.split(".");
			let formData = { ...companyFormData };

			for (let i = 0; i < nameParts.length - 1; i++) {
				formData = formData[nameParts[i]];
			}

			formData[nameParts[nameParts.length - 1]] = value;

			setCompanyFormData({ ...companyFormData });
		} else {
			setCompanyFormData({
				...companyFormData,
				[name]: value,
			});
		}
	};

	console.log(companyFormData, "companyFormData");
	return (
		<Flex flexDir={"column"}>
			<Flex w={"100%"} justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="email"
						name="social_media.contactEmail"
						width={"18.5rem"}
						label="E-mail de contato"
						placeholderText="exemplo@exemplo.com"
						onChange={handleInputChange}
						value={companyFormData.social_media?.contactEmail}
					/>
					<InputComponent
						type="text"
						name="social_media.whatsapp"
						maskType="Telefone"
						width={"18.5rem"}
						label="WhatsApp"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.whatsapp}
					/>
					<InputComponent
						type="text"
						name="social_media.contactPhone"
						maskType="Telefone"
						width={"18.5rem"}
						label="Telefone de contato"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.contactPhone}
					/>
					<InputComponent
						type="text"
						name="social_media.instagram"
						width={"18.5rem"}
						label="Instagram"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.instagram}
					/>
					<InputComponent
						type="text"
						name="social_media.facebook"
						width={"18.5rem"}
						label="Página do Facebook"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.facebook}
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="text"
						name="social_media.website"
						width={"18.5rem"}
						label="Website"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.website}
					/>
					<InputComponent
						type="text"
						name="social_media.telegram"
						width={"18.5rem"}
						label="Telegram"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.telegram}
					/>
					<InputComponent
						type="text"
						name="social_media.twitter"
						width={"18.5rem"}
						label="Twitter"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.twitter}
					/>
					<InputComponent
						type="text"
						name="social_media.jusbrasil"
						width={"18.5rem"}
						label="Perfil do Jusbrasil"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.jusbrasil}
					/>
					<InputComponent
						type="text"
						name="social_media.reclame"
						width={"18.5rem"}
						label="Perfil do Reclame Aqui"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media.reclame}
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
