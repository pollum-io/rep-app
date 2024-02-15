import {
	Modal,
	ModalOverlay,
	ModalContent,
	Button,
	Flex,
	Img,
	Text,
	Input,
} from "@chakra-ui/react";
import React from "react";

interface WhitelistModal {
	isOpen: boolean;
	onClose: () => void;
}

export const WhitelistModal: React.FC<WhitelistModal> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent borderRadius={"1.5rem"} my={"auto"} alignItems={"center"}>
				<Flex
					bgColor={"#fff"}
					borderRadius={"1.5rem"}
					boxShadow="32px 32px 40px 0px rgba(0, 0, 0, 0.02)"
					w={"44.6875rem"}
					h={"17.6875rem"}
					py={"1.5rem"}
					px={"1.625rem"}
					gap={"2.0625rem"}
				>
					<Img
						src="/logos/closeButton.svg"
						position={"absolute"}
						left={"33rem"}
						transition={"0.3s"}
						_hover={{ opacity: 0.7, cursor: "pointer" }}
						onClick={onClose}
					/>
					<Flex
						flex={"1"}
						flexDir={"column"}
						borderRadius={"1.5rem"}
						bgImage={"linear-gradient(294deg, #4BA3B7 2.17%, #007D99 52.78%)"}
						justifyContent={"flex-end"}
						px={"1.375rem"}
						py={"1.625rem"}
					>
						<Flex alignItems={"center"} justifyContent={"center"}>
							<Img
								src="/images/user.svg"
								position={"absolute"}
								bottom={"8rem"}
							/>
						</Flex>
						<Text
							color={"#fff"}
							fontSize={"0.875rem"}
							fontWeight={"500"}
							textAlign={"center"}
							mb={"1rem"}
						>
							O dono do e-mail inserido receberá uma mensagem com os próximos
							passos
						</Text>
					</Flex>
					<Flex
						flex={"1"}
						flexDir={"column"}
						py={"1.5rem"}
						px={"1.625rem"}
						justifyContent={"center"}
					>
						<Text
							color={"#007D99"}
							fontSize={"1.25rem"}
							fontWeight={"500"}
							mb={"1rem"}
						>
							Criar conta investidor{" "}
						</Text>
						<Flex flexDir={"column"} gap={"1rem"} mb={"1.5rem"}>
							<Flex flexDir={"column"} gap={"0.5rem"}>
								<Text
									fontSize={"0.875rem"}
									color={"#2D3748"}
									fontWeight={"500"}
								>
									E-mail de login
								</Text>
								<Input
									w={"17rem"}
									p={"0.375rem 0.75rem"}
									borderRadius={"0.375rem"}
									border={"1px solid #E2E8F0"}
								/>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap={"1rem"}>
							<Button
								w={"100%"}
								h={"2rem"}
								fontWeight={"500"}
								color={"#FFF"}
								fontSize={"0.875rem"}
								bg={"#1789A3"}
								borderRadius={"0.5rem"}
								transition={"0.3s"}
								_hover={{ opacity: 0.7, cursor: "pointer" }}
							>
								Criar conta
							</Button>
							<Button
								w={"100%"}
								fontWeight={"500"}
								color={"#1789A3"}
								fontSize={"0.875rem"}
								bg={"transparent"}
								borderRadius={"0.5rem"}
								h={"max"}
								transition={"0.3s"}
								_hover={{ opacity: 0.7, cursor: "pointer" }}
							>
								Cancelar
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
