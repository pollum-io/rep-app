import React, { FunctionComponent, useEffect, useState } from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { DefaultTemplate } from "../DefaultTemplate";
import {
	Button,
	Flex,
	Img,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { MenuPieChartChart } from "../../components/MeusInvestimentos/MenuPieChart";
import ImoveisTable from "../../components/MeusInvestimentos/ImoveisTable/ImoveisTable";
import { Maps } from "../../components/Maps";
import dynamic from "next/dynamic";
import { BiSearch } from "react-icons/bi";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { motion } from "framer-motion"; // Import motion from framer-motion

const PrevisaoDeCaixaChart = dynamic(
	async () => {
		const mod = await import(
			"ui/Imovel/ImovelOverviewComponents/PrevisaoDeCaixaChart"
		);
		return mod.PrevisaoDeCaixaChart;
	},
	{
		ssr: false,
	}
);

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
}

export const MeusInvestimentosContainer: FunctionComponent<UserData> = (
	props
) => {
	const [state, setState] = useState("todos");
	const { getUserInfos } = useUser();
	useEffect(() => {
		getUserInfos(
			props?.user?.investor_pf === null
				? props?.user?.investor_pj
				: props?.user?.investor_pf,
			props?.token
		);
	}, [
		getUserInfos,
		props?.token,
		props?.user?.investor_pf,
		props?.user?.investor_pj,
	]);

	return (
		<DefaultTemplate>
			<Flex
				zIndex={"1"}
				bgColor={"#1789A3"}
				borderBottomRadius="0.75rem"
				h={"12.0625rem"}
				alignItems={"end"}
			></Flex>

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
						Meus investimentos{" "}
					</Text>
					<Text fontWeight={"400"} fontSize={"0.875rem"} color={"#fff"}>
						Esse é o seu portfólio de 28/nov/23
					</Text>
				</Flex>

				<Flex>
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
										Total investido{" "}
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Flex gap={"1.5"}>
									<Text fontSize={"1.125rem"} fontWeight={"600"}>
										R$ 1.000.000,00{" "}
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
										Retorno esperado{" "}
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Flex gap={"0.75rem"}>
									<Text fontSize={"1.125rem"} fontWeight={"600"}>
										+ R$ 3.500.000,00
									</Text>
									<Text color={"#38A169"} fontSize={"1.125rem"}>
										300%
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
										Retorno já realizaddo{" "}
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Flex gap={"0.75rem"}>
									<Text
										color={"#38A169"}
										fontSize={"1.125rem"}
										fontWeight={"600"}
									>
										+ R$ 2.500.000,00{" "}
									</Text>
									<Text color={"#38A169"} fontSize={"1.125rem"}>
										200%
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Flex flexDir={"column"} mb={"1rem"} w={"100%"}>
						<Flex flexDir={"column"} pb={"11.8125rem"}>
							<Flex alignItems={"center"} mb={"2rem"} gap={"4.4375rem"}>
								<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
									Distribuição total de investimentos{" "}
								</Text>
								<MenuPieChartChart
									title="Investimentos"
									defaultSelection="Todos os imóveis"
								/>
							</Flex>
							<Flex>
								<PrevisaoDeCaixaChart />
							</Flex>
							<Flex mt={"4.5rem"}>
								<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
									Meus investimentos
								</Text>
							</Flex>
							<Flex mt={"2rem"} mb={"1.5rem"}>
								<Flex gap={"1rem"}>
									<Button
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={state === "todos" ? "#00262D" : "#718096"}
										bgColor={state === "todos" ? "#B1D8DF" : "transparent"}
										fontWeight={"500"}
										onClick={() => setState("todos")}
										_hover={{ opacity: 0.7 }}
									>
										Todos{" "}
									</Button>
									<Button
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={state === "em andamento" ? "#00262D" : "#718096"}
										bgColor={
											state === "em andamento" ? "#B1D8DF" : "transparent"
										}
										fontWeight={"500"}
										onClick={() => setState("em andamento")}
										_hover={{ opacity: 0.7 }}
									>
										Em andamento{" "}
									</Button>
									<Button
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={state === "pedentes" ? "#00262D" : "#718096"}
										bgColor={state === "pedentes" ? "#B1D8DF" : "transparent"}
										fontWeight={"500"}
										onClick={() => setState("pedentes")}
										_hover={{ opacity: 0.7 }}
									>
										Pendentes{" "}
									</Button>
									<Button
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={state === "concluidos" ? "#00262D" : "#718096"}
										bgColor={state === "concluidos" ? "#B1D8DF" : "transparent"}
										fontWeight={"500"}
										onClick={() => setState("concluidos")}
										_hover={{ opacity: 0.7 }}
									>
										Concluídos{" "}
									</Button>
								</Flex>
								<Flex ml={"4rem"}>
									<MenuPieChartChart
										title="Tipo"
										titleColor="#171923"
										defaultSelection="Todos os imóveis"
									/>
									<InputGroup>
										<InputRightElement pointerEvents="none">
											<BiSearch color="gray.300" />
										</InputRightElement>
										<Input
											w={"16.5rem"}
											px={"0.75rem"}
											py={"0.375rem"}
											h={"max"}
											ml={"5rem"}
											fontSize={"0.875rem"}
											_placeholder={{ color: "#A0AEC0" }}
											borderRadius={"0.375rem"}
											placeholder="Pesquisar por nome"
										/>{" "}
									</InputGroup>
								</Flex>
							</Flex>
							<Flex>
								<ImoveisTable />
							</Flex>
							<Flex mt={"4rem"} flexDir={"column"}>
								<Text
									color={"#171923"}
									fontWeight={"600"}
									fontSize={"1.5rem"}
									mb={"1.5rem"}
								>
									Onde você tem investido{" "}
								</Text>
								<Flex>
									<Maps />
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</motion.div>
			</Flex>
		</DefaultTemplate>
	);
};
