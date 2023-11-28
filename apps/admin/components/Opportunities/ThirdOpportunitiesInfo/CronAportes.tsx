import React, { useState } from "react";
import { Button, Flex, Img, Input, Select, Text } from "@chakra-ui/react";
import { monthsInPortuguese } from "ui";

type ComponentProps = {
	data: any;
	onInputChange: any;
	setOpportuntiesFormData: any;
	indexA: any;
};

const CronAportes: React.FC<ComponentProps> = ({
	onInputChange,
	setOpportuntiesFormData,
	indexA,
}) => {
	const [infos, setInfos] = useState([{ month: "", value: "" }]);
	const startYear = 2021;
	const endYear = 2040;
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, index) => startYear + index
	);

	const handleAddInput = (index) => {
		setInfos((prevInfos) => {
			const newInfos = [...prevInfos];
			newInfos.splice(index + 1, 0, { month: "", value: "" });
			return newInfos;
		});
	};

	const handleRemoveInput = (index) => {
		setInfos((prevInfos) => {
			const newInfos = prevInfos.filter((_, i) => i !== index);
			return newInfos;
		});

		setOpportuntiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			const newInfos = prevFormData?.disbursement_schedule[indexA].info.filter(
				(_, i) => i !== index
			);
			newFormData.disbursement_schedule[indexA] = {
				...newFormData.disbursement_schedule[indexA],
				info: newInfos,
			};
			return newFormData;
		});
	};

	const handleInputChange = (index, field, value) => {
		setInfos((prevInfos) => {
			const newInfos = [...prevInfos];
			newInfos[index][field] = value;
			return newInfos;
		});
		setOpportuntiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			newFormData.disbursement_schedule[indexA] = {
				...newFormData.disbursement_schedule[indexA],
				info: infos,
			};

			return newFormData;
		});
	};

	return (
		<Flex flexDir={"column"} gap={"0.75rem"} mb={"1.5rem"}>
			<Flex
				w={"45rem"}
				p={"1rem"}
				borderRadius={"0.375rem"}
				border={"1px solid #E2E8F0"}
				bgColor={"rgba(255, 255, 255, 0.48)"}
			>
				<Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Ano
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36)"}
							border={"1px solid #E2E8F0"}
							w={"7.5rem"}
							h={"2rem"}
							onChange={(e) => onInputChange("year", e.target.value)}
							_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
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
						<Flex>
							<Flex flexDir={"column"} gap={"1rem"}>
								{infos.map((inputValue, index) => (
									<Flex key={index} flexDir={"row"}>
										<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
											<Text
												color={"#2D3748"}
												fontSize={"0.875rem"}
												fontWeight={"500"}
											>
												Mes
											</Text>
											<Select
												placeholder="Selecione"
												fontSize={"0.875rem"}
												color={"rgba(0, 0, 0, 0.36))"}
												border={"1px solid #E2E8F0"}
												w={"7.5rem"}
												h={"2rem"}
												value={inputValue.month}
												onChange={(e) =>
													handleInputChange(index, "month", e.target.value)
												}
											>
												{monthsInPortuguese?.map((data) => (
													<option key={data.id} value={data.label}>
														{data.label}
													</option>
												))}
											</Select>
										</Flex>
										<Flex gap={"0.5rem"} flexDir={"column"}>
											<Text
												color={"#2D3748"}
												fontSize={"0.875rem"}
												fontWeight={"500"}
											>
												Valor
											</Text>
											<Flex
												flexDir={"row"}
												alignItems={"center"}
												gap={"0.5rem"}
											>
												<Input
													border={"1px solid #E2E8F0"}
													fontSize={"0.875rem"}
													h={"2rem"}
													w={"14.625rem"}
													value={inputValue.value}
													onChange={(e) =>
														handleInputChange(index, "value", e.target.value)
													}
												/>
												<Img
													onClick={handleAddInput}
													transition={"0.5s"}
													_hover={{ cursor: "pointer", opacity: 0.6 }}
													src={"/logos/plus.svg"}
												/>
												<Button
													w={"max"}
													h={"max"}
													bgColor={"transparent"}
													border={"none"}
													p={"0"}
													m={"0"}
													_hover={{ cursor: "pointer", opacity: 0.6 }}
													onClick={() => handleRemoveInput(index)}
												>
													<Img
														transition={"0.5s"}
														_hover={{ cursor: "pointer", opacity: 0.6 }}
														src={"/logos/trash.svg"}
													/>
												</Button>
											</Flex>
										</Flex>
									</Flex>
								))}
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export const CronAportesComponent: React.FC<any> = ({
	setOpportuntiesFormData,
	opportuntiesFormData,
}) => {
	const handleAddestimatedTimeline = () => {
		setOpportuntiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			const newTimelineItem = {
				year: "",
				info: [
					{
						month: "",
						value: "",
					},
				],
			};
			newFormData.disbursement_schedule = [
				...newFormData.disbursement_schedule,
				newTimelineItem,
			];

			return newFormData;
		});
	};

	const handleTimelineChange = (
		index: number,
		type: string,
		value: string | any[]
	) => {
		setOpportuntiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			newFormData.disbursement_schedule[index] = {
				...newFormData.disbursement_schedule[index],
				[type]: value,
			};

			return newFormData;
		});
	};
	return (
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
			{/* mudar para o campo correto */}
			{opportuntiesFormData?.disbursement_schedule?.map((data, index) => (
				<CronAportes
					key={index}
					data={data}
					indexA={index}
					onInputChange={(type, value) =>
						handleTimelineChange(index, type, value)
					}
					setOpportuntiesFormData={setOpportuntiesFormData}
				/>
			))}
		</Flex>
	);
};
