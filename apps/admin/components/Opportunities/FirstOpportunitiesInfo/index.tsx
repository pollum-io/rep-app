import React, { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Img,
	Text,
	Textarea,
	Select,
	useDisclosure,
} from "@chakra-ui/react";

import { useQuery } from "react-query";
import { fetchEnterpriseById } from "services";
import { PersistentFramework } from "ui";
import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { DocComponent } from "./DocComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";

type IFirstOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const FirstOpportunitiesInfo: React.FC<IFirstOpportunitiesInfo> = ({
	token,
}) => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [hoveredImage, setHoveredImage] = useState(null);
	const [docs, setDocs] = useState([{ name: "", file: null }]);
	const { setFirstStep, setSecondStep, firstStep, secondStep } =
		useCreateAdminCreateSteps();

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		const selectedImageUrls = files.map((file: any) =>
			URL.createObjectURL(file)
		);
		setSelectedImages([...selectedImages, ...selectedImageUrls]);
	};

	const removeImage = (index) => {
		const newImages = [...selectedImages];
		newImages.splice(index, 1);
		setSelectedImages(newImages);
	};

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

		console.log(updatedMembers);
		setDocs(updatedMembers);
	};

	console.log(docs, "a");
	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
			<Flex justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<Flex flexDirection={"column"} gap={"0.5rem"}>
						<Text
							as="span"
							fontSize={"0.875rem"}
							color={"#2D3748"}
							fontWeight={"500"}
						>
							Empresa responsável{" "}
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36))"}
						>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
					</Flex>
					<InputComponent
						type="text"
						width={"18.5rem"}
						name="name"
						label="Nome da oportunidade"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="localizacao"
						width={"18.5rem"}
						label="Localização"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="min_investment"
						width={"18.5rem"}
						label="Investimento mínimo (R$)"
						placeholderText=""
					/>
					<InputComponent
						type="date"
						name="init_date"
						width={"18.5rem"}
						label="Início da obra"
						placeholderText="mm/aaaa"
					/>
					<InputComponent
						type="date"
						name="expected_delivery_date"
						width={"18.5rem"}
						label="Previsão de conclusão"
						placeholderText="mm/aaaa"
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="number"
						name="profitability"
						width={"18.5rem"}
						label="Rentabilidade esperada"
						placeholderText="% ao ano"
					/>
					<InputComponent
						type="number"
						name="opportunity_resume.total_deadline"
						width={"18.5rem"}
						label="Prazo total do investimento"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="opportunity_resume.percentage_final_return"
						width={"18.5rem"}
						label="Retorno final (%)"
						placeholderText="%"
					/>
					<InputComponent
						type="number"
						name="min_invest"
						width={"18.5rem"}
						label="Preço unitário da cota"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="opportunities_details.total_units"
						width={"18.5rem"}
						label="Cotas emitidas"
						placeholderText=""
					/>
					<Flex flexDirection={"column"} gap={"0.5rem"}>
						<Text
							as="span"
							fontSize={"0.875rem"}
							color={"#2D3748"}
							fontWeight={"500"}
						>
							Estado atual da obra
						</Text>
						<Select
							placeholder="Selecione"
							fontSize={"0.875rem"}
							color={"rgba(0, 0, 0, 0.36))"}
						>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
					</Flex>
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} flexDir={"column"} mb={"2.75rem"}>
				<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
					Descreva a história, realizações e atual estrutura da empresa
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
			<Flex flexDir={"column"} gap={"0.75rem"}>
				<Flex flexDir={"column"} gap={"0.5rem"}>
					<Text color={"#2D3748"} fontWeight={"500"} fontSize={"0.875rem"}>
						Imagens da oportunidade
					</Text>
					<Text color={"#171923"} fontSize={"0.875rem"}>
						Arraste ou selecione arquivos de ?px X ?px em formato PNG ou JPG com
						no máximo ??mb.{" "}
					</Text>
				</Flex>
				{selectedImages.length > 0 ? (
					<Flex flexDir={"column"} gap={"1rem"}>
						<Flex w={"100%"} gap={"1rem"} flexWrap={"wrap"}>
							{selectedImages.map((imageUrl, index) => (
								<Flex
									key={index}
									position={"relative"}
									onMouseEnter={() => setHoveredImage(index)}
									onMouseLeave={() => setHoveredImage(null)}
								>
									{hoveredImage === index && (
										<Flex
											top="35%"
											left="35%"
											w="35%"
											h="35%"
											bgColor={"#B1D8DF"}
											borderRadius={"50%"}
											alignItems="center"
											justifyContent="center"
											transition={"0.5s"}
											position="absolute"
											onClick={() => removeImage(index)}
										>
											<Img
												position="absolute"
												color={"#007D99"}
												w={"1.0938rem"}
												h={"1.0938rem"}
												src={"/logos/blueTrash.svg"}
											/>
										</Flex>
									)}
									<Img
										src={imageUrl}
										alt={`Image ${index}`}
										width={131}
										height={131}
										borderRadius={"0.375rem"}
									/>
								</Flex>
							))}
						</Flex>
						<label htmlFor="fileInputOpImages">
							<Button
								as="span"
								bg={"transparent"}
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
							>
								+ Adicionar imagens
							</Button>
							<input
								id="fileInputOpImages"
								type="file"
								accept="image/*"
								style={{ display: "none" }}
								multiple
								onChange={handleFileChange}
							/>
						</label>
					</Flex>
				) : (
					<Flex
						w={"44.125rem"}
						h={"9.3125rem"}
						maxH={"9.3125rem"}
						bgColor={"#E2E8F0"}
						justifyContent={"center"}
						alignItems={"center"}
						borderRadius={"0.75rem"}
						position={"relative"}
					>
						<label htmlFor="fileInputOpImages">
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
								left={"40%"}
								top={"45%"}
								py={"0.625rem"}
								px={"0.5rem"}
								cursor="pointer"
								position={"absolute"}
							>
								Adicionar imagens
							</Button>
							<input
								id="fileInputOpImages"
								type="file"
								accept="image/*"
								style={{ display: "none" }}
								multiple
								onChange={handleFileChange}
							/>
						</label>
					</Flex>
				)}
			</Flex>
			<Flex>
				<Flex flexDir={"column"} gap={"0.5rem"} w={"100%"}>
					<Flex justifyContent={"space-between"}>
						<Text color={"#2D3748"} fontWeight={"500"} fontSize={"0.875rem"}>
							Materiais extras
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
							Adicionar documentos
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
						setSecondStep(true);
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
