import React, { useState } from "react";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";

import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { CronAportes } from "./CronAportes";

type IThirdOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ThirdOpportunitiesInfo: React.FC<IThirdOpportunitiesInfo> = ({
	token,
}) => {
	const {
		setFirstStep,
		setSecondStep,
		firstStep,
		secondStep,
		setThirdStep,
		setFourthStep,
	} = useCreateAdminCreateSteps();
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
						name=" opportunities_details.constructed_area" //TODO
						label="Previsão de retorno (R$)"
						placeholderText=""
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="date"
						name="opportunities_details.average_price" //TODO
						width={"18.5rem"}
						label="Data da previsão"
						placeholderText=""
					/>
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} flexDir={"column"} mb={"2.75rem"}>
				<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
					Avisos
				</Text>
				<Textarea
					placeholder="Insira o texto aqui"
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					name="description" //TODO
				/>
			</Flex>
			<Flex flexDir={"column"} gap={"0.75rem"} mb={"0.125rem"}>
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
						Cronograma de aportes
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
					<CronAportes key={index} data={data} />
				))}
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
						setFirstStep(false);
						setSecondStep(true);
						setThirdStep(false);
						setFourthStep(false);
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
						setThirdStep(false);
						setFourthStep(true);
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
