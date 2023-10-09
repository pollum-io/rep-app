import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, Img, Text, Textarea } from "@chakra-ui/react";
import { InputComponent } from "../CompanieFormCreateInput/InputComponent";
import { useCreateCompanieSteps } from "../../../../hooks/useCreateCompanieSteps";
import { AddMembersCard } from "../AddMembersCard";
import { PersistentFramework } from "ui";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";
import { useDropzone } from "react-dropzone";

export const FirstCompaniesInfo: React.FC = () => {
	const {
		handleSaveFormData,
		members,
		setMembers,
		companyFormData,
		setCompanyFormData,
		setCompanyImages,
		companyImages,
	} = useCreateCompany();
	const [showImage, setShowImage] = useState(members?.map(() => false));
	const [avatarVisible, setAvatarVisible] = useState(true);
	const [banner, setBanner] = useState(null);
	const [logo, setLogo] = useState(null);

	const fileInputRef = useRef(null);

	const fileInputRefLogo = useRef(null);
	const fileInputRefBanner = useRef(null);

	const { setFirstStep, setSecondStep, setIsCreatePage } =
		useCreateCompanieSteps();

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
			const imageUrl = value;

			setCompanyImages((prevCompanyImages) => ({
				...prevCompanyImages,
				membersImages: [...prevCompanyImages.membersImages, imageUrl],
			}));
			// updatedMembers[index][key] = imageUrl;
			// setMembers(updatedMembers);
			setAvatarVisible(false);
		}
		updatedMembers[index][key] = value;
		setMembers(updatedMembers);
		setCompanyFormData({
			...companyFormData,
			companyMember: updatedMembers,
		});
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

	const handleDeleteImage = (index) => {
		setCompanyImages((prevCompanyImages) => ({
			...prevCompanyImages,
			membersImages: prevCompanyImages.membersImages.filter(
				(_, i) => i !== index
			),
		}));
		setAvatarVisible(true);
	};

	const handleDeleteUser = (index) => {
		const updatedMembers = [...members];
		updatedMembers.splice(index, 1);
		setMembers(updatedMembers);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCompanyFormData({
			...companyFormData,
			[name]: value,
		});
	};

	const handleBannerChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// setCompanyFormData({
			// 	...companyFormData,
			// 	banner: file,
			// });
			setCompanyImages({
				...companyImages,
				banner: file,
			});
			setBanner(URL.createObjectURL(file));
		}
	};

	const handleBannerLogo = () => {
		if (fileInputRefBanner.current) {
			fileInputRefBanner.current.click();
		}
	};

	const handleLogoChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// setCompanyFormData({
			// 	...companyFormData,
			// 	logo: file,
			// });
			setCompanyImages({
				...companyImages,
				logo: file,
			});
			setLogo(URL.createObjectURL(file));
		}
	};

	const handleAddLogo = () => {
		if (fileInputRefLogo.current) {
			fileInputRefLogo.current.click();
		}
	};

	const handleDeleteLogo = () => {
		setLogo(null);
	};

	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
			<Flex justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="email"
						width={"18.5rem"}
						name="email"
						label="E-mail de login"
						placeholderText="exemplo@exemplo.com"
						onChange={handleInputChange}
						value={companyFormData.email}
					/>
					<InputComponent
						type="text"
						name="nome"
						width={"18.5rem"}
						label="Nome da Empresa"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.nome}
					/>
					<InputComponent
						type="text"
						name="localizacao"
						width={"18.5rem"}
						label="Localização"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.localizacao}
					/>
					<InputComponent
						type="text"
						name="cnpj"
						width={"18.5rem"}
						label="CNPJ"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.cnpj}
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="text"
						name="obrasEntregues"
						width={"18.5rem"}
						label="Obras entregues"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.obrasEntregues}
					/>
					<InputComponent
						type="text"
						name="obrasAndamento"
						width={"18.5rem"}
						label="Obras em andamento "
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.obrasAndamento}
					/>
					<InputComponent
						type="text"
						name="vgv"
						width={"18.5rem"}
						label="VGV Total"
						placeholderText=""
						onChange={handleInputChange}
						value={companyFormData.vgv}
					/>
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
					value={companyFormData.description}
				/>
			</Flex>
			<Flex flexDir={"column"}>
				<Text
					fontWeight={"500"}
					color={"#171923"}
					fontSize={"1.125rem"}
					mb={"1rem"}
				>
					Logotipo e banner{" "}
				</Text>
				<Flex mb={"1.5rem"}>
					<Flex
						w={"4rem"}
						h={"4rem"}
						borderRadius={"9999px"}
						bgColor={"#E2E8F0"}
						alignItems={"center"}
						justifyContent={"center"}
						color={"#fff"}
						fontSize={"1.5rem"}
						mr={"1rem"}
					>
						{logo ? (
							<Img
								w={"4rem"}
								h={"4rem"}
								borderRadius={"9999px"}
								src={logo}
								alt="Logo"
								objectFit="cover" // ou "contain" dependendo do comportamento desejado
							/>
						) : (
							<Text>SA</Text>
						)}
					</Flex>
					<Flex flexDir={"column"} gap={"0.75rem"}>
						<Button
							bg={"transparent"}
							color={"#007D99"}
							fontSize={"0.75rem"}
							fontWeight={"500"}
							border={"1px solid #007D99"}
							borderRadius={"6.25rem"}
							h={"1rem"}
							w={"7.125rem"}
							py={"0.625rem"}
							px={"0.5rem"}
							onClick={handleAddLogo}
						>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRefLogo}
								style={{ display: "none" }}
								onChange={handleLogoChange}
							/>
							Adicionar logo
						</Button>
						<Button
							bg={"transparent"}
							fontSize={"0.75rem"}
							fontWeight={"500"}
							_hover={{}}
							h={"max"}
							color={"#007D99"}
							onClick={handleDeleteLogo}
						>
							Deletar
						</Button>
					</Flex>
				</Flex>
				<Flex flexDir={"column"} gap={"0.75rem"}>
					<Flex
						w={"44.125rem"}
						h={"9.3125rem"}
						maxH={"9.3125rem"}
						bgColor={"#E2E8F0"}
						justifyContent={"center"}
						alignItems={"center"}
						borderRadius={"0.75rem"}
					>
						{banner ? (
							<Flex maxH={"9.3125rem"} objectFit={"cover"}>
								<Img src={banner} objectFit={"cover"} />
							</Flex>
						) : (
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
								onClick={handleBannerLogo}
							>
								<input
									type="file"
									accept="image/*"
									ref={fileInputRefBanner}
									style={{ display: "none" }}
									onChange={handleBannerChange}
								/>
								Clique para adicionar imagem
							</Button>
						)}
					</Flex>
					<Text color={"#171923"} fontSize={"0.875rem"}>
						Arraste ou selecione arquivos de ?px X ?px em formato PNG ou JPG com
						no máximo ??mb.
					</Text>
				</Flex>
			</Flex>
			<Flex flexDir={"column"}>
				<Flex
					w={"100%"}
					justifyContent={"space-between"}
					alignItems={"center"}
					mb={"1.25rem"}
				>
					<Text fontWeight={"500"} color={"#171923"} fontSize={"1.125rem"}>
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
						isDisabled={
							members.some(
								(member) => member.nome === "" || member.cargo === ""
							)
								? true
								: false
						}
						cursor={
							members.some(
								(member) => member.nome === "" || member.cargo === ""
							)
								? "not-allowed"
								: "pointer"
						}
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
						onImageChange={() => handleDeleteImage(index)}
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
						handleSaveFormData();
					}}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
