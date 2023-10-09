import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";

type IAvatar = {
	setShowImage?: any;
	avatarVisible?: any;
	fileInputRef?: any;
	showImage?: any;
	handleToggleImage?: any;
	foto?: any;
	nome?: string;
	cargo?: string;
	onInputChange?: any;
	onImageChange?: any;
	handleMouseEnter?: any;
	handleMouseLeave?: any;
	deleteUser?: any;
	index?: any;
};
export const Avatar: React.FC<IAvatar> = ({
	avatarVisible,
	fileInputRef,
	showImage,
	foto,
	onInputChange,
	handleMouseEnter,
	handleMouseLeave,
	onImageChange,
	handleToggleImage,
}) => {
	return (
		<Flex
			bgColor={"#E2E8F0"}
			borderRadius={"624.9375rem"}
			mr={"1.1875rem"}
			alignItems={"end"}
			transition={"0.5s"}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
	);
};
