import React from "react";
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { InputComponent } from "./CompanieFormCreateInput/InputComponent";

type IAddMembersCard = {
	setShowImage: any;
	avatarVisible: any;
	fileInputRef: any;
	showImage: any;
	handleToggleImage: any;
	foto?: any;
	nome?: string;
	cargo?: string;
	onInputChange?: any;
	onImageChange?: any;
	handleMouseEnter?: any;
	handleMouseLeave?: any;
	deleteUser?: any;
	index: any;
};

export const AddMembersCard: React.FC<IAddMembersCard> = ({
	avatarVisible,
	fileInputRef,
	showImage,
	deleteUser,
	foto,
	nome,
	cargo,
	onInputChange,
	handleMouseEnter,
	handleMouseLeave,
	onImageChange,
	index,
	handleToggleImage,
}) => {
	// const handleToggleImage = () => {
	// 	if (fileInputRef.current) {
	// 		fileInputRef.current.click();
	// 	}
	// };

	console.log(foto, "foto");
	return (
		<Flex alignItems={"end"} pb={"1.5rem"}>
			<Flex
				bgColor={"#E2E8F0"}
				borderRadius={"624.9375rem"}
				mr={"1.1875rem"}
				alignItems={"end"}
				transition={"0.5s"}
				onMouseEnter={handleMouseEnter} // Altere essa linha
				onMouseLeave={handleMouseLeave} // Altere essa linha
				position="relative"
				bgImage={"url('/logos/avatarMember.svg')"}
				w={"4rem"}
				h={"4rem"}
			>
				{avatarVisible ? (
					<Img src="/logos/avatarMember.svg" />
				) : (
					<Img
						w={"4rem"}
						h={"4rem"}
						borderRadius={"624.9375rem"}
						src={foto ? URL.createObjectURL(foto) : null}
					/>
				)}
				<input
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					onChange={(e) => onInputChange("foto", e.target.files[0])} // Captura e transmite as mudanças no cargo
					ref={fileInputRef}
				/>
				{!foto && showImage && (
					<Flex
						top="25%"
						left="25%"
						w="50%"
						h="50%"
						bgColor={"#B1D8DF"}
						borderRadius={"50%"}
						alignItems="center"
						justifyContent="center"
						position="absolute"
						transition={"0.5s"}
						onClick={handleToggleImage}
					>
						<Img
							src={"/logos/bluePlus.svg"}
							cursor="pointer"
							position="absolute"
						/>
					</Flex>
				)}
				{foto && showImage && (
					<Flex
						top="25%"
						left="25%"
						w="50%"
						h="50%"
						bgColor={"#B1D8DF"}
						borderRadius={"50%"}
						alignItems="center"
						justifyContent="center"
						transition={"0.5s"}
						position="absolute"
						onClick={() => onImageChange("foto")}
					>
						<Img
							src={"/logos/blueTrash.svg"}
							cursor="pointer"
							position="absolute"
						/>
					</Flex>
				)}
			</Flex>
			<Flex flexDir={"column"} pr={"1.5rem"}>
				<Text
					as="span"
					fontSize={"0.875rem"}
					color={"#2D3748"}
					fontWeight={"500"}
				>
					Nome do membro
				</Text>
				<Input
					p={"0.275rem 0.75rem"}
					bgColor={"#fff"}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					w={"16.5rem"}
					h={"max"}
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					_hover={{}}
					_focus={{
						boxShadow: "none",
						border: "0.0938rem solid #E2E8F0",
					}}
					value={nome}
					onChange={(e) => onInputChange("nome", e.target.value)} // Captura e transmite as mudanças no cargo
				/>
			</Flex>
			<Flex flexDir={"column"} mr={"0.6875rem"}>
				<Text
					as="span"
					fontSize={"0.875rem"}
					color={"#2D3748"}
					fontWeight={"500"}
				>
					Cargo
				</Text>
				<Input
					p={"0.275rem 0.75rem"}
					bgColor={"#fff"}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					w={"16.5rem"}
					h={"max"}
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					_hover={{}}
					_focus={{
						boxShadow: "none",
						border: "0.0938rem solid #E2E8F0",
					}}
					value={cargo}
					onChange={(e) => onInputChange("cargo", e.target.value)} // Captura e transmite as mudanças no cargo
				/>
			</Flex>
			<Flex
				mb={"0.5rem"}
				transition={"0.3s"}
				_hover={{ opacity: 0.7, cursor: "pointer" }}
				onClick={() => deleteUser()}
			>
				<Img src="/logos/trash.svg" />
			</Flex>
		</Flex>
	);
};
