import React from "react";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AdminsModal } from "./AdminsModal";

export const AdminsCard: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w={"29.4375rem"}
			border={"1px solid #fff"}
			borderRadius={"1.25rem"}
			boxShadow=" 14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
			p={"1rem"}
			flexDir={"column"}
		>
			<AdminsModal isOpen={isOpen} onClose={onClose} />

			<Flex
				alignItems={"center"}
				justifyContent={"space-between"}
				mb={"1.5rem"}
			>
				<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
					Adminstradores
				</Text>
				<Button
					color={"#FFF"}
					fontSize={"0.875rem"}
					fontWeight={"500"}
					borderRadius={"6.25rem"}
					bgColor={"#1789A3"}
					px={"0.75rem"}
					py={"0.625rem"}
					w={"9.875rem"}
					h={"2rem"}
					transition={"0.3s"}
					_hover={{ opacity: 0.7, cursor: "pointer" }}
					onClick={onOpen}
				>
					Criar novo admin
				</Button>
			</Flex>
			<Flex
				mb={"0.5rem"}
				border={"1px solid #EDF2F7"}
				borderRadius={"0.75rem"}
				justifyContent={"space-between"}
				px={"0.75rem"}
				py={"0.5rem"}
				alignItems={"center"}
			>
				<Flex flexDir={"column"}>
					<Text
						textOverflow={"ellipsis"}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						maxWidth={"11.25rem"}
						color={"#171923"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
					>
						João Antônio da Silva
					</Text>
					<Text
						textOverflow={"ellipsis"}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						maxWidth={"11.25rem"}
						color={"#2D3748"}
						fontSize={"0.75rem"}
					>
						joaoantonio@gmail.com
					</Text>
				</Flex>
				<Text
					fontWeight={"500"}
					fontSize={"0.75rem"}
					color={"#E53E3E"}
					transition={"0.3s"}
					_hover={{ opacity: 0.7, cursor: "pointer" }}
				>
					Bloquear acesso
				</Text>
				<Text
					fontWeight={"500"}
					fontSize={"0.75rem"}
					color={"#007D99"}
					transition={"0.3s"}
					_hover={{ opacity: 0.7, cursor: "pointer" }}
				>
					Alterar senha{" "}
				</Text>
			</Flex>
		</Flex>
	);
};
