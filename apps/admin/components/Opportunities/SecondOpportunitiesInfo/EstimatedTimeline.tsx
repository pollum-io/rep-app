import React, { useMemo, useState } from "react";
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
	data: any;
	onInputChange: any;
};

const years = [
	"2024",
	"2025",
	"2026",
	"2027",
	"2028",
	"2029",
	"2030",
	"2031",
	"2032",
	"2033",
	"2034",
];

const EstimatedTimeline: React.FC<any> = ({
	onInputChange,
	setOpportunitiesFormData,
	indexA,
}) => {
	const [infos, setInfos] = useState([{ name: "", status: "Not Completed" }]);

	const handleAddInput = (index) => {
		setInfos((prevInfos) => {
			const newInfos = [...prevInfos];
			newInfos.splice(index + 1, 0, { name: "", status: "Not Completed" });
			return newInfos;
		});
	};

	const handleRemoveInput = (index) => {
		setInfos((prevInfos) => {
			const newInfos = prevInfos.filter((_, i) => i !== index);
			return newInfos;
		});

		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			console.log(prevFormData, "prevFormData");

			const newInfos = prevFormData?.estimated_timeline[indexA].info.filter(
				(_, i) => i !== index
			);
			console.log(newInfos, "newInfos");
			newFormData.estimated_timeline[indexA] = {
				...newFormData.estimated_timeline[indexA],
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
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			newFormData.estimated_timeline[indexA] = {
				...newFormData.estimated_timeline[indexA],
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
							color={"rgba(0, 0, 0, 0.36))"}
							border={"1px solid #E2E8F0"}
							w={"7.5rem"}
							h={"2rem"}
							onChange={(e) => onInputChange("year", e.target.value)}
						>
							{years?.map((data, index) => (
								<option key={index} value={data}>
									{data}
								</option>
							))}
						</Select>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Text color={"#2D3748"} fontSize={"0.875rem"} fontWeight={"500"}>
							Subdivisão
						</Text>
						<Input
							border={"1px solid #E2E8F0"}
							fontSize={"0.875rem"}
							h={"2rem"}
							w={"9.25rem"}
							onChange={(e) => onInputChange("quarter", e.target.value)}
						/>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Flex flexDir={"column"} gap={"0.5rem"}>
							{infos.map((input, index) => (
								<Flex flexDir={"column"} gap={"1rem"} key={index}>
									<Flex flexDir={"column"}>
										<Flex justifyContent={"space-between"} pb={"0.5rem"}>
											<Text
												color={"#2D3748"}
												fontSize={"0.875rem"}
												fontWeight={"500"}
											>
												Nome da fase
											</Text>
											<Stack align="center" direction="row">
												<Text
													color={"#2D3748"}
													fontSize={"0.75rem"}
													fontWeight={"400"}
												>
													Fase concluída
												</Text>
												<Switch
													size="sm"
													isChecked={input.status === "Completed"}
													onChange={(e) =>
														handleInputChange(
															index,
															"status",
															e.target.checked ? "Completed" : "Not Completed"
														)
													}
												/>
											</Stack>
										</Flex>
										<Flex mb={"1.5rem"} gap={"1.5rem"} alignItems={"center"}>
											<Input
												border={"1px solid #E2E8F0"}
												fontSize={"0.875rem"}
												h={"2rem"}
												w={"14.625rem"}
												value={input.name}
												onChange={(e) =>
													handleInputChange(index, "name", e.target.value)
												}
											/>
											<Img
												transition={"0.5s"}
												_hover={{ cursor: "pointer", opacity: 0.6 }}
												src={"/logos/plus.svg"}
												onClick={() => handleAddInput(index)}
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
	);
};

export const EstimatedTimelineComponent: React.FC<any> = ({
	setOpportunitiesFormData,
	opportunitiesFormData,
}) => {
	const handleAddestimatedTimeline = () => {
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			const newTimelineItem = {
				year: "",
				quarter: "",
				info: [{ name: "", status: "" }],
			};

			newFormData.estimated_timeline = [
				...newFormData.estimated_timeline,
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
		setOpportunitiesFormData((prevFormData) => {
			const newFormData = { ...prevFormData };
			const estimatedTimeline = { year: "", quarter: "", info: [] };

			newFormData.estimated_timeline[index] = {
				...newFormData.estimated_timeline[index],
				[type]: value,
			};

			return newFormData;
		});
	};

	return (
		<Flex
			flexDir={"column"}
			alignItems={"center"}
			justifyContent={"space-between"}
			gap={"0.75rem"}
		>
			<Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
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
			{opportunitiesFormData?.estimated_timeline?.map((data, index) => (
				<EstimatedTimeline
					key={index}
					data={data}
					indexA={index}
					onInputChange={(type, value) =>
						handleTimelineChange(index, type, value)
					}
					setOpportunitiesFormData={setOpportunitiesFormData}
				/>
			))}
		</Flex>
	);
};
