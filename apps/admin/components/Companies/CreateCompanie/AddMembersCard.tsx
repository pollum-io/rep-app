import React from "react";
import { Flex, Img, Input, Text } from "@chakra-ui/react";
import { Avatar } from "./Avatar";

type IAddMembersCard = {
	setShowImage: any;
	avatarVisible: any;
	showImage?: any;
	handleToggleImage: any;
	image?: any;
	name?: string;
	position?: string;
	onInputChange?: any;
	onImageChange?: any;
	handleMouseEnter?: any;
	handleMouseLeave?: any;
	deleteUser?: any;
	index: any;
};

export const AddMembersCard: React.FC<IAddMembersCard> = ({
	avatarVisible,
	showImage,
	deleteUser,
	image,
	name,
	position,
	onInputChange,
	handleMouseEnter,
	handleMouseLeave,
	onImageChange,
	handleToggleImage,
}) => {
	return (
		<Flex alignItems={"end"} pb={"1.5rem"}>
			<Avatar
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
				avatarVisible={avatarVisible}
				showImage={showImage}
				foto={image}
				onImageChange={onImageChange}
				handleToggleImage={handleToggleImage}
				onInputChange={onInputChange}
			/>
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
					value={name}
					onChange={(e) => onInputChange("name", e.target.value)} // Captura e transmite as mudanças no cargo
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
					value={position}
					onChange={(e) => onInputChange("position", e.target.value)} // Captura e transmite as mudanças no cargo
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
