import { Flex, Text, Button, Img } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { IEmpreendimentoData } from "../../../dtos/IEmpreendimentoMeuInvestimento";

export const ImoveisTableRow: FunctionComponent<IEmpreendimentoData> = (
	props
) => {
	const getStatusColor = (status?: any) => {
		switch (status) {
			case "Concluído":
				return { bg: "#E4F2F3", color: "#00576B" };
			case "Pagamento pendente":
				return { bg: "#FED7D7", color: "#E53E3E" };
			case "Assinatura pendente":
				return { bg: "#F0E8FF", color: "#6E40E7" };
			case "Em andamento":
				return { bg: "#FEEBCB", color: "#B7791F" };
			default:
				return { bg: "white", color: "black" };
		}
	};

	return (
		<Flex
			pr="1rem"
			h={"4.25rem"}
			justifyContent="space-between"
			alignItems="center"
			borderRadius={"0.75rem"}
			mb={"0.75rem"}
			cursor={!props.isModal ? "pointer" : "unset"}
			onClick={
				!props.isModal
					? () => {
							props.setEmpreendimento(props);
							props.modalOpen();
					  }
					: null
			}
			_hover={
				!props.isModal
					? {
							boxShadow:
								"0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10);",
					  }
					: null
			}
			border={!props.isModal ? "none" : "1px solid #EDF2F7"}
			w={"100%"}
		>
			<Flex flex="1.5" flexDir={"row"} alignItems={"center"}>
				<Flex h={"max"} mr={"0.75rem"}>
					<Img
						w={"4.25rem"}
						h={"4.25rem"}
						objectFit={"cover"}
						borderLeftRadius={"0.75rem"}
						src="/images/backgrounds/Image.png"
					/>
				</Flex>
				<Flex flexDir={"column"}>
					<Text
						w={"max"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={"#171923"}
					>
						{props?.empreendimento?.length >= 15
							? `${props?.empreendimento?.slice(0, 15)}...`
							: props?.empreendimento}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						{props?.tipoDoEmpreendiment0}
					</Text>
				</Flex>
			</Flex>
			<Flex flex="0.7" flexDir={"column"}>
				<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
					{props?.inicioInvest}
				</Text>
				<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
					{props?.cotas}
				</Text>
			</Flex>
			<Flex flex="0.8" flexDir={"column"}>
				<Text fontSize={"0.875rem"} color={"#718096"}>
					{props?.totalInvestido}
				</Text>
				<Text fontSize={"0.75rem"} fontWeight={"500"} color={"#2D3748"}>
					{props?.porcentagem}
				</Text>
			</Flex>
			<Flex flex="0.6" flexDir={"column"}>
				<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"500"}>
					{props?.conclusao}
				</Text>
				<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
					{props?.prev}
				</Text>
			</Flex>
			<Flex flex="0.9" flexDir={"column"}>
				<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"500"}>
					{props?.lucratividade}
				</Text>
				<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
					{props?.descLucratividade}
				</Text>
			</Flex>
			<Flex flex="1">
				<Button
					p={"0.5rem"}
					w={"9.125rem"}
					h={"1.25rem"}
					textAlign={"center"}
					borderRadius={"2.625rem"}
					fontSize={"0.75rem"}
					bg={getStatusColor(props?.status)?.bg}
					color={getStatusColor(props?.status)?.color}
					fontWeight={"500"}
					_hover={{}}
				>
					{props?.status}
				</Button>
			</Flex>
			<Flex flex="1">
				<Button
					p={"0.5rem"}
					w={"8.375rem"}
					h={"1.25rem"}
					textAlign={"center"}
					borderRadius={"2.625rem"}
					fontSize={"0.75rem"}
					bg={"transparent"}
					color={"#007D99"}
					fontWeight={"500"}
					_hover={{}}
				>
					{props?.acao}
				</Button>
			</Flex>
		</Flex>
	);
};
