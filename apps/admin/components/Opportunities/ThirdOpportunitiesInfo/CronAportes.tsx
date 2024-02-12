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
	data: unknown;
};

export const CronAportes: React.FC<ComponentProps> = (props) => {
	const [additionalInputs, setAdditionalInputs] = useState([""]);

	const handleAddInput = () => {
		setAdditionalInputs([...additionalInputs, ""]);
	};

	const handleRemoveInput = (index) => {
		if (additionalInputs.length > 1) {
			const newInputs = [...additionalInputs];
			newInputs.splice(index, 1);
			setAdditionalInputs(newInputs);
		}
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
						>
							<option value="option1">2021</option>
							<option value="option2">2022</option>
							<option value="option3">2023</option>
						</Select>
					</Flex>
					<Flex flexDir={"column"} gap={"0.5rem"} mr={"2.0625rem"}>
						<Flex>
							<Flex flexDir={"column"} gap={"1rem"}>
								{additionalInputs.map((inputValue, index) => (
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
											>
												<option value="option1">Janeiro</option>
												<option value="option2">Fevereiro</option>
												<option value="option3">Março</option>
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
													value={inputValue}
													onChange={(e) => {
														const newInputs = [...additionalInputs];
														newInputs[index] = e.target.value;
														setAdditionalInputs(newInputs);
													}}
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
