import React, { useState } from "react";
import { Button, Flex, Img, Text, Textarea, Select } from "@chakra-ui/react";

import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { DocComponent } from "./DocComponent";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { fetchEnterprise } from "services";
import { useQuery, useQueryClient } from "react-query";
import { useCreateOpportunity } from "../../../hooks/useCreateOpportunity";
import { approval_process_data } from "./approval_process_data";

type IFirstOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const FirstOpportunitiesInfo: React.FC<IFirstOpportunitiesInfo> = ({
	token,
}) => {
	const { opportunitiesFormData, setOpportunitiesFormData } =
		useCreateOpportunity();
	const [selectedOpportunitiesPictures, setSelectedOpportuntiesPictures] =
		useState([]);
	const [hoveredImage, setHoveredImage] = useState(null);
	const [docs, setDocs] = useState([{ name: "", file: null }]);

	const { setFirstStep, setSecondStep, firstStep, secondStep } =
		useCreateAdminCreateSteps();

	const {
		data: allEnterprises,
		isLoading,
		error,
	} = useQuery(["enterprises"], async () => await fetchEnterprise());

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		const selectedImageUrls = files.map((file: any) =>
			URL.createObjectURL(file)
		);
		setSelectedOpportuntiesPictures([
			...selectedOpportunitiesPictures,
			...selectedImageUrls,
		]);
		setOpportunitiesFormData({
			...opportunitiesFormData,
			pictures_enterprise: [
				...selectedOpportunitiesPictures,
				...selectedImageUrls,
			],
		});
	};

	const removeImage = (index) => {
		const newImages = [...selectedOpportunitiesPictures];
		newImages.splice(index, 1);
		setSelectedOpportuntiesPictures(newImages);
		setOpportunitiesFormData({
			...opportunitiesFormData,
			pictures_enterprise: newImages,
		});
	};

	const handleAddDoc = () => {
		setDocs([...docs, { name: "", file: null }]);
	};

	const handleDeleteDoc = (index) => {
		const updatedDocs = [...docs];
		updatedDocs.splice(index, 1);
		setDocs(updatedDocs);
		setOpportunitiesFormData({
			...opportunitiesFormData,
			opportunity_resume_files: updatedDocs,
		});
	};

	const handleDocsChange = (index, value) => {
		const updatedDocs = [...docs];
		updatedDocs[index]["file"] = value;
		updatedDocs[index]["name"] = value.name;
		setOpportunitiesFormData({
			...opportunitiesFormData,
			opportunity_resume_files: updatedDocs,
		});
		setDocs(updatedDocs);
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
							name="enterprise_name"
							onChange={handleInputChange}
							value={opportunitiesFormData?.enterprise_name}
						>
							{allEnterprises?.enterprises?.map((data) => (
								<option key={data?._id} value={data?.enterprise_name}>
									{data?.enterprise_name}
								</option>
							))}
						</Select>
					</Flex>
					<InputComponent
						type="text"
						width={"18.5rem"}
						name="name"
						label="Nome da oportunidade"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.name}
					/>
					<InputComponent
						type="text"
						name="localizacao"
						width={"18.5rem"}
						label="Localização"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.localizacao}
					/>
					<InputComponent
						type="number"
						name="min_investment"
						width={"18.5rem"}
						label="Investimento mínimo (R$)"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.min_investment}
					/>
					<InputComponent
						type="date"
						name="init_date"
						width={"18.5rem"}
						label="Início da obra"
						placeholderText="mm/aaaa"
						onChange={handleInputChange}
						value={opportunitiesFormData?.init_date}
					/>
					<InputComponent
						type="date"
						name="expected_delivery_date"
						width={"18.5rem"}
						label="Previsão de conclusão"
						placeholderText="mm/aaaa"
						onChange={handleInputChange}
						value={opportunitiesFormData?.expected_delivery_date}
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="number"
						name="profitability"
						width={"18.5rem"}
						label="Rentabilidade esperada"
						placeholderText="% ao ano"
						onChange={handleInputChange}
						value={opportunitiesFormData?.profitability}
					/>
					<InputComponent
						type="number"
						name="opportunity_resume.total_deadline"
						width={"18.5rem"}
						label="Prazo total do investimento"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.opportunity_resume?.total_deadline}
					/>
					<InputComponent
						type="number"
						name="opportunity_resume.percentage_final_return"
						width={"18.5rem"}
						label="Retorno final (%)"
						placeholderText="%"
						onChange={handleInputChange}
						value={
							opportunitiesFormData?.opportunity_resume?.percentage_final_return
						}
					/>
					<InputComponent
						type="number"
						name="opportunity_resume.min_invest"
						width={"18.5rem"}
						label="Preço unitário da cota"
						placeholderText=""
						onChange={handleInputChange}
						value={opportunitiesFormData?.opportunity_resume?.min_invest}
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
							maxW={"18.5rem"}
							onChange={handleInputChange}
							name="approval_process"
							value={opportunitiesFormData?.approval_process}
						>
							{approval_process_data.map((data) => (
								<option key={data.id} value={data.label}>
									{data.label}
								</option>
							))}
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
					onChange={handleInputChange}
					value={opportunitiesFormData?.description}
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
				{selectedOpportunitiesPictures.length > 0 ? (
					<Flex flexDir={"column"} gap={"1rem"}>
						<Flex w={"100%"} gap={"1rem"} flexWrap={"wrap"}>
							{selectedOpportunitiesPictures.map((imageUrl, index) => (
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
