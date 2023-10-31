import React, { useState } from "react";
import { Button, Flex, Img, Text, Textarea } from "@chakra-ui/react";
import { PrevFinanceiraTable } from "./PrevFinanceiraTable";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";

type IFourthOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const FourthOpportunitiesInfo: React.FC<IFourthOpportunitiesInfo> = ({
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
	const [banner, setBanner] = useState(null);

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

	const handleBannerLogo = () => {
		const fileInput = document.querySelector(
			"#fileInputBanner"
		) as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleBannerChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setBanner(URL.createObjectURL(file));
		}
	};

	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
			<Flex flexDir={"column"} gap={"0.75rem"}>
				<Flex flexDir={"column"} gap={"0.5rem"}>
					<Text fontWeight={"500"} color={"#171923"} fontSize={"0.875rem"}>
						Estrutura do negócio
					</Text>
					<Text color={"#171923"} fontSize={"0.875rem"}>
						Arraste ou selecione arquivos de ?px X ?px em formato PNG ou JPG com
						no máximo ??mb.
					</Text>
				</Flex>
				<Flex
					w={"44.125rem"}
					h={"9.3125rem"}
					maxH={"9.3125rem"}
					bgColor={"#E2E8F0"}
					justifyContent={"center"}
					alignItems={"center"}
					borderRadius={"0.75rem"}
				>
					{banner && (
						<Flex maxH={"9.3125rem"} objectFit={"cover"}>
							<Img src={banner} objectFit={"cover"} />
						</Flex>
					)}

					<Button
						as="span"
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
						onClick={handleBannerLogo}
						position={"absolute"}
					>
						<input
							id="fileInputBanner"
							type="file"
							accept="image/*"
							style={{ display: "none" }}
							onChange={handleBannerChange}
						/>
					</Button>
				</Flex>
			</Flex>
			<Flex flexDir={"column"} gap={"0.75rem"} mb={"0.125rem"}>
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
						Previsão financeira{" "}
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
					<PrevFinanceiraTable key={index} data={data} index={index} />
				))}
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
