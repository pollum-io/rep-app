import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IGeneralForecast } from "../../types/IGeneralForecast";

interface IGeralInfoEnterprise {
	generalForecast: IGeneralForecast;
}

export const GeralInfoEnterpriseComponent: React.FC<IGeralInfoEnterprise> = ({
	generalForecast,
}) => {
	const currentDate = new Date();

	const formattedDate = format(currentDate, "dd/MMM/yy", { locale: ptBR });
	return (
		<>
			<Flex
				bgColor={"#1789A3"}
				borderBottomRadius={"0.75rem"}
				h={"12.0625rem"}
				w={"100%"}
			></Flex>
			<Flex
				flexDir={"column"}
				justifyContent={"center"}
				alignContent={"center"}
				px={{
					sm: "24px",
					md: "5rem",
					lg: "0rem",
					xl: "0rem",
					"2xl": "25rem",
				}}
			>
				<Flex
					flexDir={"column"}
					gap={"0.25rem"}
					pb={"1.875rem"}
					position={"relative"}
					bottom={{
						sm: "24px",
						md: "10rem",
						lg: "10rem",
						xl: "10rem",
						"2xl": "5rem",
					}}
					zIndex={"9999"}
				>
					<Text
						fontSize={"1.875rem"}
						fontWeight={"600"}
						lineHeight={"2.25rem"}
						color={"white"}
						w={"100%"}
					>
						Visão Geral{" "}
					</Text>
					<Text fontWeight={"400"} fontSize={"0.875rem"} color={"#fff"}>
						Esse é o seu portfólio de {formattedDate}
					</Text>
				</Flex>
				<Flex flexDir={"row"} w={"100%"} justifyContent={"end"}>
					<Flex
						position={"relative"}
						bg={"white"}
						zIndex={"9999"}
						bottom={{
							sm: "24px",
							md: "14rem",
							lg: "14rem",
							xl: "14rem",
							"2xl": "9rem",
						}}
						w={"45rem"}
						px={"1.5rem"}
						py={"1rem"}
						borderRadius={"0.75rem"}
						boxShadow="0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10);"
						gap={"2.75rem"}
					>
						<Flex flexDir={"column"} gap={"0.25rem"}>
							<Flex gap={"0.5rem"}>
								<Text
									color={"#007D99"}
									fontSize={"0.875rem"}
									fontWeight={"500"}
								>
									Total arrecadado{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Flex gap={"1.5"}>
								<Text
									fontSize={"1.125rem"}
									fontWeight={"600"}
									color={"#171923"}
								>
									{" "}
									{formatCurrency(generalForecast?.totalContributions)}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap={"0.25rem"}>
							<Flex gap={"0.5rem"}>
								<Text
									color={"#007D99"}
									fontSize={"0.875rem"}
									fontWeight={"500"}
								>
									Previsão de aportes{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Flex gap={"0.75rem"}>
								<Text
									fontSize={"1.125rem"}
									fontWeight={"600"}
									color={"#171923"}
								>
									{" "}
									{formatCurrency(generalForecast?.totalRaised)}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap={"0.25rem"}>
							<Flex gap={"0.5rem"}>
								<Text
									color={"#007D99"}
									fontSize={"0.875rem"}
									fontWeight={"500"}
								>
									Total de cotistas{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Flex gap={"0.75rem"}>
								<Text
									color={"#171923"}
									fontSize={"1.125rem"}
									fontWeight={"600"}
								>
									{generalForecast?.totalShareholders}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
