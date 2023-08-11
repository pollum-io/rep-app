import React, { FunctionComponent, useEffect, useState } from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import EmpreendimentoTable from "../../components/Faturas/Table";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF: UserDataPF;
	userDataPJ: UserDataPJ;
}

export const FaturasContainer: FunctionComponent<UserData> = (props) => {
	const [state, setState] = useState("aberta");
	const { getUserInfos } = useUser();

	useEffect(() => {
		getUserInfos(
			props?.user?.investor_pf === null
				? props?.user?.investor_pj
				: props?.user?.investor_pf
		);
	}, [getUserInfos, props?.user?.investor_pf, props?.user?.investor_pj]);

	return (
		<DefaultTemplate>
			<Flex
				zIndex={"1"}
				bgColor={"#1789A3"}
				borderBottomRadius="0.75rem"
				h={"12.0625rem"}
				alignItems={"end"}
				w="100%"
			/>
			<Flex
				maxW={"70rem"}
				flexDir={"column"}
				justifyContent={"center"}
				alignContent={"center"}
				m={{
					sm: "24px",
					md: "14rem",
					lg: "5rem",
					xl: "5rem",
					"2xl": "0 auto",
				}}
			>
				<Flex w={"max"} flexDir={"row"} mb={"4.9375rem"}>
					<Flex
						flexDir={"column"}
						gap={"0.25rem"}
						pb={"1.875rem"}
						position={"absolute"}
						top={{
							sm: "24px",
							md: "11rem",
							lg: "11rem",
							xl: "11rem",
							"2xl": "11rem",
						}}
						zIndex={"9999"}
					>
						<Text
							fontSize={"1.875rem"}
							fontWeight={"600"}
							lineHeight={"2.25rem"}
							color={"white"}
							w={"70%"}
							pb={"1.875rem"}
						>
							Acompanhe aqui suas faturas
						</Text>
					</Flex>
					<Flex
						justifyContent={"end"}
						align={"flex-end"}
						position={"absolute"}
						bg={"white"}
						zIndex={"9999"}
						top={{
							sm: "24px",
							md: "14rem",
							lg: "13rem",
							xl: "13rem",
							"2xl": "13rem",
						}}
						left={{
							sm: "24px",
							md: "14rem",
							lg: "39%",
							xl: "40.5%",
							"2xl": "47%",
						}}
						w={"39rem"}
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
									Parcelas quitadas
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Flex gap={"1.5"}>
								<Text fontSize={"1.125rem"} fontWeight={"600"}>
									12
								</Text>
								<Text fontSize={"1.125rem"}>de 8</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap={"0.25rem"}>
							<Flex gap={"0.5rem"}>
								<Text
									color={"#007D99"}
									fontSize={"0.875rem"}
									fontWeight={"500"}
								>
									Total de cotas na LIVN{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Text fontSize={"1.125rem"}>02</Text>
						</Flex>
						<Flex flexDir={"column"} gap={"0.25rem"}>
							<Flex gap={"0.5rem"}>
								<Text
									color={"#007D99"}
									fontSize={"0.875rem"}
									fontWeight={"500"}
								>
									Prazo final aportes{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<Text fontSize={"1.125rem"}>Dezembro 2027</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex flexDir={"column"} pb={".8125rem"}>
					<Flex flexDir={"column"} pb={"11.8125rem"}>
						<Text
							color={"#171923"}
							fontWeight={"600"}
							fontSize={"1.5rem"}
							mb={"2rem"}
						>
							Resumo de faturas
						</Text>
						<Flex gap={"1.5rem"}>
							<Flex
								flexDir={"column"}
								gap={"0.75rem"}
								px={"1.5rem"}
								py={"1rem"}
								w={"27.125rem"}
								h={"max"}
								border={"1px solid #EDF2F7"}
								borderRadius={"0.75rem"}
							>
								<Text fontSize={"0.875rem"} color={"#1A202C"}>
									Valor de todas as faturas abertas
								</Text>
								<Text color={"#865DF0"} fontWeight={"600"} fontSize={"1.5rem"}>
									R$ 80.000,00
								</Text>
								<Text color={"#718096"} fontSize={"0.75rem"}>
									Efetue o pagamento conforme as datas de vencimento para evitar
									multas e garantir o investimento.
								</Text>
							</Flex>
							<Flex
								flexDir={"column"}
								px={"1.5rem"}
								py={"1rem"}
								w={"12.8125rem"}
								border={"1px solid #EDF2F7"}
								borderRadius={"0.75rem"}
								gap={"0.5rem"}
							>
								<Img w={"3.8125rem"} src="/icons/proxima-fatura.svg" />
								<Flex gap={"0.5rem"}>
									<Text fontSize={"0.875rem"} color={"#1A202C"}>
										Próxima fatura
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
									01/01/2024
								</Text>
							</Flex>
							<Flex
								flexDir={"column"}
								px={"1.5rem"}
								py={"1rem"}
								w={"12.8125rem"}
								border={"1px solid #EDF2F7"}
								borderRadius={"0.75rem"}
								gap={"0.5rem"}
							>
								<Img w={"3.8125rem"} src="/icons/ultimo-pagamento.svg" />
								<Flex gap={"0.5rem"} w={"max"}>
									<Text fontSize={"0.875rem"} color={"#1A202C"}>
										Último pagamento{" "}
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
									01/12/2024{" "}
								</Text>
							</Flex>
							<Flex
								flexDir={"column"}
								px={"1.5rem"}
								py={"1rem"}
								w={"12.8125rem"}
								border={"1px solid #EDF2F7"}
								borderRadius={"0.75rem"}
								gap={"0.5rem"}
							>
								<Img w={"3.8125rem"} src="/icons/contratos-pendentes.svg" />
								<Flex gap={"0.5rem"} w={"max"}>
									<Text fontSize={"0.875rem"} color={"#1A202C"}>
										Contratos pendentes{" "}
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#1A202C"}>
									02{" "}
								</Text>
							</Flex>
						</Flex>
						<Flex gap={"1rem"} mt={"2rem"} mb={"1.5rem"}>
							<Button
								borderRadius={"624.9375rem"}
								px={"0.75rem"}
								py={"0.5rem"}
								color={state === "aberta" ? "#00262D" : "#718096"}
								bgColor={state === "aberta" ? "#B1D8DF" : "transparent"}
								fontWeight={"500"}
								onClick={() => setState("aberta")}
								_hover={{ opacity: 0.7 }}
							>
								Abertas
							</Button>
							<Button
								borderRadius={"624.9375rem"}
								px={"0.75rem"}
								py={"0.5rem"}
								color={state === "pagas" ? "#00262D" : "#718096"}
								bgColor={state === "pagas" ? "#B1D8DF" : "transparent"}
								fontWeight={"500"}
								onClick={() => setState("pagas")}
								_hover={{ opacity: 0.7 }}
							>
								Pagas{" "}
							</Button>
						</Flex>
						<Flex w={"100%"}>
							<EmpreendimentoTable />
						</Flex>
					</Flex>
				</Flex>{" "}
			</Flex>
		</DefaultTemplate>
	);
};
