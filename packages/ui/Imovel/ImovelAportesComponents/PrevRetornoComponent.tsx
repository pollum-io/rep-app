import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../utils/BRCurrency";

interface IComponentProps {
	data?: any; //TODO
	isMyInvest: boolean;
}

export const PrevRetornoComponent: React.FC<IComponentProps> = ({
	data,
	isMyInvest,
}) => {
	let isMozilla = false;
	if (typeof window !== "undefined") {
		isMozilla = /firefox/i.test(window.navigator.userAgent);
	}
	return (
		<Flex mb={"2rem"} flexDir={"column"}>
			{isMyInvest && (
				<Text
					color={"#171923"}
					fontWeight={"600"}
					fontSize={"1.5rem"}
					mb={"2rem"}
				>
					Previsão de retorno{" "}
				</Text>
			)}
			<Flex gap={"8.8125rem"} mb={"1.5rem"}>
				<Flex flexDir={"column"} gap={"0.25rem"}>
					<Flex gap={"0.5rem"} w={isMozilla ? "9rem" : "unset"}>
						<Text
							fontSize={"0.875rem"}
							w={"100%"}
							color={"#007D99"}
							fontWeight={"500"}
						>
							Valor estimado
						</Text>
						<Img src="/icons/info-circle-littlegray.svg" />
					</Flex>
					<Flex gap={"0.75rem"}>
						<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
							+ {formatCurrency(data?.data?.estimated_value)}
						</Text>
						<Text fontSize={"1.125rem"} fontWeight={"400"} color={"#38A169"}>
							%{data?.data?.expected_rentability?.toFixed(2)}
						</Text>
					</Flex>
				</Flex>
				<Flex>
					<Flex flexDir={"column"} gap={"0.25rem"}>
						<Flex gap={"0.5rem"} w={isMozilla ? "14rem" : "unset"}>
							<Text fontSize={"0.875rem"} color={"#007D99"} fontWeight={"500"}>
								Data da previsão{" "}
							</Text>
							<Img src="/icons/info-circle-littlegray.svg" />
						</Flex>
						<Flex gap={"0.75rem"}>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								-
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Text
				fontSize={"0.875rem"}
				color={"#171923"}
				w={isMyInvest === true ? "65% " : "80%"}
			>
				Os retornos serão reembolsados a partir das receitas advindas das
				vendas. Os valores aportados como adiantamento serão devolvidos
				corrigidos pelo IPCA. Ao final, os resultados obtidos (lucros) serão
				divididos em igualdade entre grupo gestor e grupo investidor.
			</Text>
		</Flex>
	);
};
