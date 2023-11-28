import React, { useState } from "react";
import {
	Button,
	Flex,
	Img,
	Input,
	Select,
	Stack,
	Switch,
	Text,
} from "@chakra-ui/react";

type ComponentProps = {
	index: any;
	onInputChange: any;
	handleRemoveInput: any;
};
const PrevFinanceiraTableComponent: React.FC<ComponentProps> = ({
	index,
	onInputChange,
	handleRemoveInput,
}) => {
	const startYear = 2021;
	const endYear = 2040;
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, index) => startYear + index
	);

	return (
		<Flex flexDir={"column"} gap={"0.75rem"} mb={"1.5rem"}>
			<Flex
				w={"45rem"}
				p={"1rem"}
				borderRadius={"0.375rem"}
				border={"1px solid #E2E8F0"}
				bgColor={"rgba(255, 255, 255, 0.48)"}
			>
				<Flex alignItems={"center"}>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Ano
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36))"}
							border={"1px solid #E2E8F0"}
							w={"7.5rem"}
							h={"2rem"}
							onChange={(e) => onInputChange("period", e.target.value)}
						>
							{years.map((year) => (
								<option
									style={{ color: "rgba(0, 0, 0, 0.36)" }}
									key={year}
									value={year}
								>
									{year}
								</option>
							))}
						</Select>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Custo (R$)
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"7.6875rem"}
							onChange={(e) => onInputChange("cost", e.target.value)}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Receita total (R$)
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"7.6875rem"}
							onChange={(e) => onInputChange("total_revenue", e.target.value)}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Un. vendidas
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"4.8125rem"}
							onChange={(e) => onInputChange("units_sold", e.target.value)}
						/>
					</Flex>
					<Img
						transition={"0.5s"}
						_hover={{ cursor: "pointer", opacity: 0.6 }}
						src={"/logos/trash.svg"}
						mt={"1.5rem"}
						onClick={() => handleRemoveInput(index)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export const PrevFinanceiraTable: React.FC<any> = ({
	setOpportunitiesFormData,
	opportunitiesFormData,
}) => {
	const handleAddPrevAportes = () => {
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			const newTimelineItem = {
				period: "",
				cost: "",
				total_revenue: "",
				units_sold: "",
			};
			newFormData.schedule_table = [
				...newFormData.schedule_table,
				newTimelineItem,
			];

			return newFormData;
		});
	};

	const handleRemoveInput = (index) => {
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			newFormData.schedule_table = prevFormData.schedule_table.filter(
				(item, i) => i !== index
			);

			return newFormData;
		});
	};

	const handleTimelineChange = (
		index: number,
		type: string,
		value: string | any[]
	) => {
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			newFormData.schedule_table[index] = {
				...newFormData.schedule_table[index],
				[type]: value,
			};

			return newFormData;
		});
	};

	return (
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
					onClick={handleAddPrevAportes}
				>
					Adicionar ano
				</Button>
			</Flex>
			{opportunitiesFormData?.schedule_table?.map((data, index) => (
				<PrevFinanceiraTableComponent
					key={index}
					index={index}
					onInputChange={(type, value) =>
						handleTimelineChange(index, type, value)
					}
					handleRemoveInput={handleRemoveInput}
				/>
			))}
		</Flex>
	);
};
