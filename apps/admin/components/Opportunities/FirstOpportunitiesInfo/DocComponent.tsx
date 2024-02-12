import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";

type IDocComponent = {
	name: string;
	file: unknown;
	onDeleteDoc: unknown;
	onDocValueChange: unknown;
	index: unknown;
};

export const DocComponent: React.FC<IDocComponent> = ({
	file,
	name,
	onDeleteDoc,
	onDocValueChange,
	index,
}) => {
	return (
		<Flex
			alignItems={"center"}
			bgColor={"#ffffff"}
			px={"1rem"}
			py={"0.5rem"}
			borderRadius={"0.75rem"}
			w={"100%"}
			justifyContent="space-between"
		>
			<Flex alignItems={"center"} gap={"1.5rem"}>
				<Img src={"/logos/folder.svg"} />
				<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"400"}>
					{name ? name : "Nome do documento"}
				</Text>
			</Flex>
			<Flex gap={"1.5rem"}>
				<label htmlFor={`fileInputOpFile-${index}`}>
					<Img
						transition={"0.5s"}
						_hover={{ cursor: "pointer", opacity: 0.6 }}
						src={"/logos/upload.svg"}
					/>
					<input
						id={`fileInputOpFile-${index}`}
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={(e) => onDocValueChange(e.target.files[0])}
					/>
				</label>
				<Img
					transition={"0.5s"}
					_hover={{ cursor: "pointer", opacity: 0.6 }}
					src={"/logos/trash.svg"}
					onClick={onDeleteDoc}
				/>
			</Flex>
		</Flex>
	);
};
