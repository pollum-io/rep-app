import { FunctionComponent, useState, useRef } from "react";
import { Button, Flex, Img, Text, Input, Textarea } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { CompaniesControll } from "../../components/Companies/CompanieControllPage/CompaniesControll";
import { useCreateCompanieSteps } from "../../hooks/useRegisterSteps";
import { RegisterSteps } from "../../components/Companies/CreateCompanie/RegisterSteps";
import { InputComponent } from "../../components/Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";
import { AddMembersCard } from "../../components/Companies/CreateCompanie/AddMembersCard";

export const CompaniesContainer: FunctionComponent = () => {
	const [avatarVisible, setAvatarVisible] = useState(true);
	const {
		isCreatePage,
		firstStep,
		setFirstStep,
		secondStep,
		setSecondStep,
		setIsCreatePage,
	} = useCreateCompanieSteps();
	const [members, setMembers] = useState([{ foto: null, nome: "", cargo: "" }]);
	const [showImage, setShowImage] = useState(members.map(() => false));

	const fileInputRef = useRef(null);

	const handleAddMember = () => {
		setMembers([...members, { foto: null, nome: "", cargo: "" }]);
	};

	const handleToggleImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleMemberChange = (index, key, value) => {
		const updatedMembers = [...members];
		if (key === "foto" && value) {
			const imageUrl = URL.createObjectURL(value);
			updatedMembers[index][key] = imageUrl;
			setMembers(updatedMembers);
			setAvatarVisible(false);
		}
		updatedMembers[index][key] = value;
		setMembers(updatedMembers);
	};

	const handleMouseEnter = (index) => {
		const updatedShowImage = [...showImage];
		updatedShowImage[index] = true;
		setShowImage(updatedShowImage);
	};

	const handleMouseLeave = (index) => {
		const updatedShowImage = [...showImage];
		updatedShowImage[index] = false;
		setShowImage(updatedShowImage);
	};
	const handleDeleteImage = (index, key) => {
		const updatedMembers = [...members];
		updatedMembers[index][key] = null;
		setAvatarVisible(true);
		setMembers(updatedMembers);
	};

	const handleDeleteUser = (index) => {
		const updatedMembers = [...members];
		updatedMembers.splice(index, 1);
		setMembers(updatedMembers);
	};

	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}>
				{!isCreatePage ? (
					<CompaniesControll />
				) : (
					<>
						<Flex flexDir={"column"}>
							<Flex alignItems={"baseline"} gap={"1rem"}>
								<Button
									bgColor={"#B1D8DF"}
									borderRadius={"6.25rem"}
									p="0.75rem"
								>
									<Img src={"/logos/leftArrowBlue.svg"} />
								</Button>
								<Text
									color={"#007D99"}
									fontSize={"1.5rem"}
									fontWeight={"500"}
									mt={"1rem"}
									mb={"2rem"}
								>
									Criar empresa
								</Text>
							</Flex>
						</Flex>
						<Flex
							flexDir={"column"}
							w={"45rem"}
							justifyContent={"center"}
							alignItems={"center"}
							ml={"60%"}
						>
							<RegisterSteps />
							<Flex mt={"2.25rem"} flexDir={"column"} w={"100%"}>
								<Flex
									alignItems={"center"}
									justifyContent={"space-between"}
									w={"100%"}
									mb="1rem"
								>
									<Text
										fontWeight={"500"}
										color={"#171923"}
										fontSize={"1.125rem"}
									>
										Dados gerais
									</Text>
									<Text
										fontSize={"0.75rem"}
										color={"#007D99"}
										fontWeight={"500"}
										transition={"0.3s"}
										_hover={{ opacity: 0.7, cursor: "pointer" }}
									>
										Cancelar criação
									</Text>
								</Flex>
								{firstStep && (
									<Flex flexDir={"column"} gap={"1.5rem"}>
										<Flex justifyContent={"space-between"}>
											<Flex flexDir={"column"} gap={"1.5rem"}>
												<InputComponent
													type="email"
													width={"18.5rem"}
													name="email"
													label="E-mail de login"
													placeholderText="exemplo@exemplo.com"
												/>
												<InputComponent
													type="text"
													name="nome"
													width={"18.5rem"}
													label="Nome da Empresa"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="localizacao"
													width={"18.5rem"}
													label="Localização"
													placeholderText=""
												/>
											</Flex>
											<Flex flexDir={"column"} gap={"1.5rem"}>
												<InputComponent
													type="text"
													name="obrasEntregues"
													width={"18.5rem"}
													label="Obras entregues"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="obrasAndamento"
													width={"18.5rem"}
													label="Obras em andamento "
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="vgv"
													width={"18.5rem"}
													label="VGV Total"
													placeholderText=""
												/>
											</Flex>
										</Flex>
										<Flex gap={"1.5rem"} flexDir={"column"} mb={"2.75rem"}>
											<Text
												fontSize={"0.875rem"}
												color={"#2D3748"}
												fontWeight={"500"}
											>
												Descreva a história, realizações e atual estrutura da
												empresa
											</Text>
											<Textarea
												placeholder="Insira o texto aqui"
												_placeholder={{
													color: "rgba(0, 0, 0, 0.36)",
													fontSize: "0.875rem",
												}}
												borderRadius={"0.375rem"}
												border={"1px solid #E2E8F0"}
											/>
										</Flex>
										<Flex flexDir={"column"}>
											<Flex
												w={"100%"}
												justifyContent={"space-between"}
												alignItems={"center"}
												mb={"1.25rem"}
											>
												<Text
													fontWeight={"500"}
													color={"#171923"}
													fontSize={"1.125rem"}
												>
													Dados da equipe
												</Text>
												<Button
													bgColor={"transparent"}
													fontSize={"0.75rem"}
													fontWeight={"500"}
													color={"#007D99"}
													border={"1px solid #007D99"}
													borderRadius={"6.25rem"}
													w={"8.8125rem"}
													h={"1.5rem"}
													px={"0.5rem"}
													py={"0.825rem"}
													transition={"0.3s"}
													_hover={{ opacity: 0.7, cursor: "pointer" }}
													onClick={handleAddMember}
												>
													Adicionar integrante
												</Button>
											</Flex>
											{members.map((member, index) => (
												<AddMembersCard
													key={index}
													index={index}
													avatarVisible={avatarVisible}
													fileInputRef={fileInputRef}
													handleToggleImage={handleToggleImage}
													handleMouseEnter={() => handleMouseEnter(index)}
													handleMouseLeave={() => handleMouseLeave(index)}
													setShowImage={setShowImage}
													showImage={showImage[index]}
													foto={member.foto}
													nome={member.nome}
													cargo={member.cargo}
													onInputChange={(key, value) =>
														handleMemberChange(index, key, value)
													}
													onImageChange={(key) => handleDeleteImage(index, key)}
													deleteUser={() => handleDeleteUser(index)}
												/>
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
													setIsCreatePage(false);
													setFirstStep(false);
													setSecondStep(false);
												}}
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
								)}
								{secondStep && (
									<Flex flexDir={"column"}>
										<Flex w={"100%"} justifyContent={"space-between"}>
											<Flex flexDir={"column"} gap={"1.5rem"}>
												<InputComponent
													type="email"
													name="contactEmail"
													width={"18.5rem"}
													label="E-mail de contato"
													placeholderText="exemplo@exemplo.com"
												/>
												<InputComponent
													type="text"
													name="whatsapp"
													width={"18.5rem"}
													label="WhatsApp"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="contactPhone"
													width={"18.5rem"}
													label="Telefone de contato"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="instagram"
													width={"18.5rem"}
													label="Instagram"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="facebook"
													width={"18.5rem"}
													label="Página do Facebook"
													placeholderText=""
												/>
											</Flex>
											<Flex flexDir={"column"} gap={"1.5rem"}>
												<InputComponent
													type="email"
													name="telegram"
													width={"18.5rem"}
													label="Telegram"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="twitter"
													width={"18.5rem"}
													label="Twitter"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="jusbrasil"
													width={"18.5rem"}
													label="Perfil do Jusbrasil"
													placeholderText=""
												/>
												<InputComponent
													type="text"
													name="reclame"
													width={"18.5rem"}
													label="Perfil do Reclame Aqui"
													placeholderText=""
												/>
											</Flex>
										</Flex>
										<Flex gap={"1.5rem"} mb={"10.875rem"} mt={"2rem"}>
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
								)}
							</Flex>
						</Flex>
					</>
				)}
			</Flex>
		</DefaultTemplate>
	);
};
