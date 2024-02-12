import React, { useState } from "react";
import { Button, Flex, Text, Textarea, Select } from "@chakra-ui/react";

import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { EstimatedTimeline } from "./EstimatedTimeline";
import { DocComponent } from "../FirstOpportunitiesInfo/DocComponent";

type ISecondOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const SecondOpportunitiesInfo: React.FC<ISecondOpportunitiesInfo> = ({
	token,
}) => {
	const { setFirstStep, setSecondStep, firstStep, secondStep, setThirdStep } =
		useCreateAdminCreateSteps();
	const [opportuntiesFormData, setOpportuntiesFormData] = useState<unknown>({
		enterprise_name: "",
		name: "",
		localizacao: "",
		min_investment: 0,
		init_date: "",
		expected_delivery_date: "",
		profitability: 0,
		opportunity_resume: {
			total_deadline: "",
			percentage_final_return: "",
			min_invest: "",
		},
		opportunities_details: {
			total_units: "",
			constructed_area: "",
			estimated_vgv: "",
			average_price: "",
		},
		approval_process: "",
		description: "",
		pictures_enterprise: [], // esse é o selectedOpportunitiesPictures
		opportunity_resume_files: [], // esse é o array docs
	});
	const [docs, setDocs] = useState([{ name: "", file: null }]);

	const [estimatedTimeline, setEstimatedTimeline] = useState([
		{
			year: "",
			data: [
				{
					quarter: "",
					info: [
						{
							name: "",
							status: "",
						},
					],
				},
			],
		},
	]);

	const handleAddDoc = () => {
		setDocs([...docs, { name: "", file: null }]);
	};

	const handleDeleteDoc = (index) => {
		const updatedDocs = [...docs];
		updatedDocs.splice(index, 1);
		setDocs(updatedDocs);
	};

	const handleDocsChange = (index, value) => {
		console.log({ index, value }, "index, key, value");

		const updatedMembers = [...docs];
		updatedMembers[index]["file"] = value;
		updatedMembers[index]["name"] = value.name;

		setDocs(updatedMembers);
	};

	const handleAddestimatedTimeline = () => {
		setEstimatedTimeline([
			...estimatedTimeline,
			{
				year: "",
				data: [
					{
						quarter: "",
						info: [
							{
								name: "",
								status: "",
							},
						],
					},
				],
			},
		]);
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
					/>
					<InputComponent
						type="text"
						name="opportunities_details.total_units"
						width={"18.5rem"}
						label="Lotes ou unidades"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name=" opportunities_details.estimated_vgv"
						width={"18.5rem"}
						label="VGV estimado"
						placeholderText=""
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="number"
						name="opportunities_details.average_price"
						width={"18.5rem"}
						label="Preço médio"
						placeholderText=""
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
					name="description"
				/>
			</Flex>
			<Flex flexDir={"column"} gap={"0.75rem"} mb={"3.125rem"}>
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
						Cronograma estimado
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
						onClick={handleAddestimatedTimeline}
					>
						Adicionar ano
					</Button>
				</Flex>
				{estimatedTimeline?.map((data, index) => (
					<EstimatedTimeline key={index} data={data} />
				))}
			</Flex>
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
							onClick={handleAddDoc}
						>
							Adicionar documento
						</Button>
					</Flex>

					{docs?.map((data, index) => (
						<DocComponent
							key={index}
							index={index}
							name={data?.name}
							file={data?.file}
							onDeleteDoc={() => handleDeleteDoc(index)}
							onDocValueChange={(value) => handleDocsChange(index, value)}
						/>
					))}

					{docs.length && (
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
