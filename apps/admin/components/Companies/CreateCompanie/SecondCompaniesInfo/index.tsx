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
	token: string;
}

export const SecondCompaniesInfo: React.FC<ISecondCompaniesInfo> = ({
	onOpenModal,
	token,
}) => {
	const { setFirstStep, setSecondStep } = useCreateCompanieSteps();
	const {
		handleSaveFormData,
		companyFormData,
		setCompanyFormData,
		entepriseId,
		isEditing,
		setMembers,
		isNotCretedYet,
	} = useCreateCompany();

	const { data, isLoading, error } = useQuery(
		["enterpriseById"],
		async () => await fetchEnterpriseById(entepriseId, token),
		{
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				if (isEditing && !isLoading) {
					PersistentFramework.add("formDataEdit", JSON.stringify(data));
					setMembers(data?.team);
					setCompanyFormData({
						...data,
						enterprise_name:
							companyFormData?.enterprise_name !== data?.enterprise_name
								? companyFormData?.enterprise_name
								: data?.enterprise_name,
						email:
							companyFormData?.email !== data?.email
								? companyFormData?.email
								: data?.email,
						localizacao: data?.address?.neighborhood || "",
						cnpj:
							companyFormData?.cnpj !== data?.cnpj
								? companyFormData?.cnpj
								: data?.cnpj,
						enterprise_logo:
							companyFormData?.enterprise_logo !== data?.enterprise_logo
								? companyFormData?.enterprise_logo
								: data?.enterprise_logo,
						enterprise_banner:
							companyFormData?.enterprise_banner !== data?.enterprise_banner
								? companyFormData?.enterprise_banner
								: data?.enterprise_banner,
						description:
							companyFormData?.description !== data?.description
								? companyFormData?.description
								: data?.description,
						team:
							companyFormData?.team !== data?.team
								? companyFormData?.team
								: data?.team,
						contact_number:
							companyFormData?.contact_number !== data?.contact_number
								? companyFormData?.contact_number
								: data?.social_media?.telephone,
						enterprise_info: {
							delivered_enterprises:
								companyFormData?.enterprise_info?.delivered_enterprises !==
								data?.enterprise_info?.delivered_enterprises
									? companyFormData?.enterprise_info?.delivered_enterprises
									: data?.enterprise_info?.delivered_enterprises,
							in_progress:
								companyFormData?.enterprise_info?.in_progress !==
								data?.enterprise_info?.in_progress
									? companyFormData?.enterprise_info?.in_progress
									: data?.enterprise_info?.in_progress,
							total_vgv:
								companyFormData?.enterprise_info?.total_vgv !==
								data?.enterprise_info?.total_vgv
									? companyFormData?.enterprise_info?.total_vgv
									: data?.enterprise_info?.total_vgv,
						},
						social_media: {
							contactEmail: data?.social_media?.email || "",
							whatsapp: data?.social_media?.whatsapp || "",
							telephone: data?.social_media?.telephone || "",
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
			if (name === "social_media.telephone") {
				setCompanyFormData({
					...companyFormData,
					contact_number: value,
				});
			}
		} else {
			setCompanyFormData({
				...companyFormData,
				[name]: value,
			});
		}
	};

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
						name="social_media.telephone"
						maskType="Telefone"
						width={"18.5rem"}
						label="Telefone de contato"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData?.social_media?.telephone}
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
					isDisabled={isNotCretedYet === true ? true : false}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
