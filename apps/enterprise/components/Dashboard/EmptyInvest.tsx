import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const EmptyInvest: React.FC = () => {
	const router = useRouter();

	return (
		<Flex flexDir={"column"} alignItems={"center"} mb={"11.25rem"}>
			<Text
				color={"#171923"}
				fontSize={"1.5rem"}
				fontWeight={"600"}
				textAlign={"center"}
				mb={"1rem"}
			>
				Ainda não há dados de vendas.{" "}
			</Text>
			<Text
				w={"33%"}
				color={"#171923"}
				fontWeight={"500"}
				textAlign={"center"}
				justifyContent={"center"}
				pb={"2rem"}
			>
				Assim que houver compra de cotas, você poderá ver todos os dados,
				gráficos e resumos de investimentos com filtros inteligentes nesta
				página.
			</Text>
			<Button
				h="max"
				bgColor="#1789A3"
				color="#FFF"
				px={"1rem"}
				py={"10px"}
				w={"24.5rem"}
				fontWeight={"500"}
				borderRadius={"0.5rem"}
				onClick={() =>
					router.push({
						pathname: `/oportunidades`,
					})
				}
			>
				Ir para a página de Empreendimentos{" "}
			</Button>
		</Flex>
	);
};
