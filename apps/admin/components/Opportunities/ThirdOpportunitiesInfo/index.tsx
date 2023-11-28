import React, { useState } from "react";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";

import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { CronAportesComponent } from "./CronAportes";

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

	const [opportuntiesFormData, setOpportuntiesFormData] = useState<any>({
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
			return_descritption: "",
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
		incorporation_enrollment: "",
		estimated_timeline: [
			{
				year: "",
				quarter: "",
				info: [
					{
						name: "",
						status: "",
					},
				],
			},
		],
		disbursement_schedule: [
			{
				year: "",
				info: [
					{
						month: "",
						value: "",
					},
				],
			},
		],
		blueprints: [],
		schedule_table: [],
	});

	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
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
					name="opportunity_resume.return_descritption"
				/>
			</Flex>
			<CronAportesComponent
				setOpportuntiesFormData={setOpportuntiesFormData}
				opportuntiesFormData={opportuntiesFormData}
			/>
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
