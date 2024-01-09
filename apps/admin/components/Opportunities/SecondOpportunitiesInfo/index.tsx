import React, { useState } from "react";
import { Button, Flex, Text, Textarea, Select } from "@chakra-ui/react";

import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { EstimatedTimelineComponent } from "./EstimatedTimeline";
import { DocComponent } from "../FirstOpportunitiesInfo/DocComponent";
import { useCreateOpportunity } from "../../../hooks/useCreateOpportunity";

type ISecondOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const SecondOpportunitiesInfo: React.FC<ISecondOpportunitiesInfo> = ({
	token,
}) => {
	const { setFirstStep, setSecondStep, firstStep, secondStep, setThirdStep } =
		useCreateAdminCreateSteps();
	const { opportunitiesFormData, setOpportunitiesFormData } =
		useCreateOpportunity();
	const [plantas, setPlantas] = useState([{ name: "", file: null }]);

	const handleAddPlantas = () => {
		setPlantas([...plantas, { name: "", file: null }]);
	};

	const handleDeletePlantas = (index) => {
		const updatedBlueprints = [...plantas];
		updatedBlueprints.splice(index, 1);
		setPlantas(updatedBlueprints);
		setOpportunitiesFormData({
			...opportunitiesFormData,
			blueprints: updatedBlueprints,
		});
	};

	const handlePlantasChange = (index, value) => {
		const updatedBlueprints = [...plantas];
		updatedBlueprints[index]["file"] = value;
		updatedBlueprints[index]["name"] = value.name;
		setOpportunitiesFormData({
			...opportunitiesFormData,
			blueprints: updatedBlueprints,
		});
		setPlantas(updatedBlueprints);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name.includes(".")) {
			const nameParts = name.split(".");
			let formData = { ...opportunitiesFormData };
			for (let i = 0; i < nameParts.length - 1; i++) {
				formData = formData[nameParts[i]];
			}
			formData[nameParts[nameParts.length - 1]] = value;
			setOpportunitiesFormData({ ...opportunitiesFormData });
		} else {
			setOpportunitiesFormData({
				...opportunitiesFormData,
				[name]: value,
			});
		}
	};

	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
			<Flex justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="text"
						width={"18.5rem"}
						name="opportunities_details.constructed_area"
						label="Área construída"
						placeholderText="m2"
						onChange={handleInputChange}
						value={
							opportunitiesFormData?.opportunities_details?.constructed_area
						}
					/>
					<InputComponent
						type="text"
						name="opportunities_details.total_units"
						width={"18.5rem"}
						label="Lotes ou unidades"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.opportunities_details?.total_units}
					/>
					<InputComponent
						type="number"
						name="opportunities_details.estimated_vgv"
						width={"18.5rem"}
						label="VGV estimado"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.opportunities_details?.estimated_vgv}
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="number"
						name="opportunities_details.average_price"
						width={"18.5rem"}
						label="Preço médio"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.opportunities_details?.average_price}
					/>
					<Flex flexDirection={"column"} gap={"0.5rem"}>
						<Text
							as="span"
							fontSize={"0.875rem"}
							color={"#2D3748"}
							fontWeight={"500"}
						>
							Situação registral{" "}
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36))"}
							name="incorporation_enrollment"
							onChange={handleInputChange}
							value={opportunitiesFormData?.incorporation_enrollment}
						>
							<option value="Memorial em elaboração">
								Memorial em elaboração
							</option>
							<option value="Memorial protocolado/ sob análise do R.I">
								Memorial protocolado/ sob análise do R.I
							</option>
							<option value="Em cumprimento das exigências do R.I">
								Em cumprimento das exigências do R.I
							</option>
							<option value="Exigências cumpridas/sob análise do R.I">
								Exigências cumpridas/sob análise do R.I
							</option>
							<option value="Memorial registrado">Memorial registrado</option>
						</Select>
					</Flex>
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} flexDir={"column"} mb={"2.75rem"}>
				<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
					Descreva aqui as unidades do empreendimento
				</Text>
				<Textarea
					placeholder="Insira o texto aqui"
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					name="opportunities_details.technical_description"
					onChange={handleInputChange}
					value={
						opportunitiesFormData?.opportunities_details?.technical_description
					}
				/>
			</Flex>
			<EstimatedTimelineComponent
				setOpportunitiesFormData={setOpportunitiesFormData}
				opportunitiesFormData={opportunitiesFormData}
			/>
			<Flex>
				<Flex flexDir={"column"} gap={"0.5rem"} w={"100%"}>
					<Flex justifyContent={"space-between"}>
						<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
							Plantas
						</Text>
						<Button
							as="span"
							bg={"#ffffff"}
							color={"#007D99"}
							fontSize={"0.75rem"}
							fontWeight={"500"}
							border={"1px solid #007D99"}
							borderRadius={"6.25rem"}
							h={"1rem"}
							w={"max"}
							py={"0.625rem"}
							px={"0.5rem"}
							cursor="pointer"
							onClick={handleAddPlantas}
						>
							Adicionar documento
						</Button>
					</Flex>

					{plantas?.map((data, index) => (
						<DocComponent
							key={index}
							index={index}
							name={data?.name}
							file={data?.file}
							onDeleteDoc={() => handleDeletePlantas(index)}
							onDocValueChange={(value) => handlePlantasChange(index, value)}
						/>
					))}

					{plantas.length && (
						<Text color={"#171923"} fontSize={"0.875rem"}>
							Os documentos adicionados irão aparecer aqui.
						</Text>
					)}
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} mb={"10.875rem"}>
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
					isDisabled={firstStep && !secondStep ? true : false}
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
						setSecondStep(false);
						setThirdStep(true);
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
