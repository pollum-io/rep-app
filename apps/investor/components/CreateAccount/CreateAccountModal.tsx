import { FunctionComponent, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Flex,
	Text,
	Img,
	Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchEditInvestorPF } from "../../services";
import { UserDataPJ } from "../../dtos/UserPJ";
import { UserDataPF } from "../../dtos/UserPF";
import { fetchEditInvestorPJ } from "../../services/fetchEditInvestorPJ";

interface ICreateAccountModal {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	token: string;
	investorPF?: UserDataPF;
	investorPJ?: UserDataPJ;
}

export const CreateAccountModal: FunctionComponent<ICreateAccountModal> = (
	props
) => {
	const { isOpen, onClose, userId, token, investorPF, investorPJ } = props;
	const { push } = useRouter();

	useEffect(() => {
		const change = async () => {
			if (investorPF) {
				await fetchEditInvestorPF(
					userId,
					{ ...investorPF, isPerfilCompleted: true },
					token
				);
			} else {
				await fetchEditInvestorPJ(
					userId,
					{ ...investorPJ, isPerfilCompleted: true },
					token
				);
			}
		};
		change();
	}, [investorPF, investorPJ, token, userId]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
			<ModalOverlay />
			<ModalContent
				my={"auto"}
				borderRadius={"1rem"}
				h={"max"}
				py={"1.5rem"}
				px={"1.5rem"}
			>
				<ModalCloseButton />
				<Flex flexDir={"row"} gap={"3rem"}>
					<Flex
						h={"16rem"}
						flexDir={"column"}
						alignItems={"center"}
						bg="linear-gradient(294.39deg, #4BA3B7 2.17%, #007D99 52.78%)"
						borderRadius={"1rem"}
						px={"1.375rem"}
						pb={"1.5625rem"}
						justifyContent={"flex-end"}
					>
						<Img
							src={"/images/Modal/Wellcome-Image2x.svg"}
							w={"19rem"}
							h={"19rem"}
							position={"absolute"}
							bottom={"5rem"}
						/>
						<Text
							fontSize="0.875rem"
							fontWeight={500}
							lineHeight={"1.25rem"}
							textAlign={"center"}
							color={"white"}
							w={"74%"}
						>
							Simplificamos para você a forma de investir no mercado imobiliário
						</Text>
					</Flex>
					<Flex flexDir={"column"} w={"19rem"} justifyContent={"center"}>
						<Text
							fontWeight={600}
							fontSize={"1.25rem"}
							color={"#007D99"}
							pb={"1rem"}
						>
							Bem-vindo a LIVN
						</Text>
						<Text fontWeight={400} fontSize={"0.75rem"} pb={"1.4375rem"}>
							Complete o seu cadastro para poder investir nas oportunidades
							disponíveis para você na plataforma
						</Text>
						<Button
							bgColor={"#007D99"}
							color={"white"}
							fontWeight={500}
							fontSize={"0.875rem"}
							_hover={{ opacity: 0.8 }}
							w={"19rem"}
							h={"max"}
							py="0.625rem"
							mb={"1rem"}
							onClick={() => {
								push({ pathname: `/usuario`, query: { id: userId } });
							}}
						>
							Completar Cadastro
						</Button>
						<Button
							bgColor={"transparent"}
							color={"#007D99"}
							fontWeight={500}
							fontSize={"0.75rem"}
							_hover={{ opacity: 0.7 }}
							onClick={onClose}
						>
							ou Prosseguir para Oportunidades
						</Button>
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
