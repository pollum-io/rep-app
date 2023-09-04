import React, { FunctionComponent, useLayoutEffect, useMemo } from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { InvestmentModel } from "../../dtos/IInvestment";
import { Flex, Img, Text } from "@chakra-ui/react";
import { MeusInvestimentosPage } from "../../components/MeusInvestimentos/Page/MeusInvestimentosPage";
import { formatCurrency } from "ui/utils/BRCurrency";
import { EmptyInvest } from "../../components/MeusInvestimentos/EmptyInvest";
import { useQuery } from "react-query";
import { fetchInvestmentByUser } from "../../services/fetchInvestmentByUser";
import { Oval } from "react-loader-spinner";

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	investments?: InvestmentModel[];
}

export const MeusInvestimentosContainer: FunctionComponent<UserData> = (
	props
) => {
	const { getUserInfos } = useUser();
	const currentDate = new Date();
	const formattedDate = format(currentDate, "dd/MMM/yy", { locale: ptBR });

	useLayoutEffect(() => {
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

	const {
		data: investment,
		isError: isErrorInvestment,
		isLoading: isLoadingInvestment,
	} = useQuery(
		["investment", props?.token],
		async () => {
			try {
				return await fetchInvestmentByUser(props?.token);
			} catch (error) {
				throw new Error("Erro ao buscar investimento");
			}
		},
		{}
	);

	const investsSome = useMemo(() => {
		const investDashboard = {
			totalInvest: 0,
			totalReturnExpected: 0,
			totalReturnRealized: 0,
			profitability: 0,
		};

		investDashboard.totalInvest = investment?.data?.investments?.reduce(
			(total, investment) => {
				return total + investment.total_invested;
			},
			0
		);
		investDashboard.totalReturnExpected = investment?.data?.investments?.reduce(
			(total, investment) => {
				return total + investment.expected_rentability;
			},
			0
		);
		investDashboard.totalReturnRealized = investment?.data?.investments?.reduce(
			(total, investment) => {
				return total + investment.return_realized;
			},
			0
		);
		investDashboard.profitability = investment?.data?.investments?.reduce(
			(total, investment) => {
				return total + investment.profitability;
			},
			0
		);

		return investDashboard;
	}, [investment?.data?.investments]);
	console.log(investment);
	return (
		<DefaultTemplate>
			<>
				{isLoadingInvestment ? (
					<Flex
						zIndex={"99999"}
						justifyContent={"center"}
						bgColor={"#ffffff7f"}
						w={"100&"}
						h={"60rem"}
						position={"relative"}
						bottom={"20"}
						alignItems={"center"}
					>
						<Oval
							height={108}
							width={108}
							color="#1789A3"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="oval-loading"
							secondaryColor="#ffffff"
							strokeWidth={4}
							strokeWidthSecondary={4}
						/>
					</Flex>
				) : (
					<>
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
												Total investido{" "}
											</Text>
											<Img src="/icons/info-circle-littlegray.svg" />
										</Flex>
										<Flex gap={"1.5"}>
											<Text fontSize={"1.125rem"} fontWeight={"600"}>
												{investment?.data?.investments?.length
													? ` + ${formatCurrency(investsSome?.totalInvest)}`
													: "-"}
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
												{investment?.data?.investments?.length
													? ` + ${formatCurrency(
															investsSome?.totalReturnExpected
													  )}`
													: "-"}
											</Text>
											<Text color={"#38A169"} fontSize={"1.125rem"}>
												{investment?.data?.investments?.length
													? `${investsSome?.profitability}%`
													: "-"}
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
												Retorno já realizado{" "}
											</Text>
											<Img src="/icons/info-circle-littlegray.svg" />
										</Flex>
										<Flex gap={"0.75rem"}>
											<Text
												color={"#38A169"}
												fontSize={"1.125rem"}
												fontWeight={"600"}
											>
												{investment?.data?.investments?.length
													? ` + ${formatCurrency(
															investsSome?.totalReturnRealized
													  )}`
													: "-"}
											</Text>
											<Text color={"#38A169"} fontSize={"1.125rem"}>
												{investment?.data?.investments?.length ? ` 200%` : "-"}
											</Text>
										</Flex>
									</Flex>
								</Flex>
							</Flex>

							{investment?.data?.investments?.length ? (
								<MeusInvestimentosPage
									token={props?.token}
									investments={investment?.data?.investments}
									isMoreThenOnePage={
										investment?.data?.totalPages > 1 ? true : false
									}
								/>
							) : (
								<EmptyInvest investments={investment?.data?.investments} />
							)}
						</Flex>
					</>
				)}
			</>
		</DefaultTemplate>
	);
};
