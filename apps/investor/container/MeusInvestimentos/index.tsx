import React, {
	FunctionComponent,
	useEffect,
	useLayoutEffect,
	useMemo,
} from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { DefaultTemplate } from "../DefaultTemplate";

import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { InvestmentModel } from "../../dtos/IInvestment";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { MeusInvestimentosPage } from "../../components/MeusInvestimentos/Page/MeusInvestimentosPage";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useRouter } from "next/router";
import { EmptyInvest } from "../../components/MeusInvestimentos/EmptyInvest";

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

	const investsSome = useMemo(() => {
		const investDashboard = {
			totalInvest: 0,
			totalReturnExpected: 0,
			totalReturnRealized: 0,
			profitability: 0,
		};

		investDashboard.totalInvest = props?.investments?.reduce(
			(total, investment) => {
				return total + investment.total_invested;
			},
			0
		);
		investDashboard.totalReturnExpected = props?.investments?.reduce(
			(total, investment) => {
				return total + investment.expected_rentability;
			},
			0
		);
		investDashboard.totalReturnRealized = props?.investments?.reduce(
			(total, investment) => {
				return total + investment.return_realized;
			},
			0
		);
		investDashboard.profitability = props?.investments?.reduce(
			(total, investment) => {
				return total + investment.profitability;
			},
			0
		);

		return investDashboard;
	}, [props?.investments]);

	return (
		<DefaultTemplate>
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
										{props?.investments?.length
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
										{props?.investments?.length
											? ` + ${formatCurrency(investsSome?.totalReturnExpected)}`
											: "-"}
									</Text>
									<Text color={"#38A169"} fontSize={"1.125rem"}>
										{props?.investments?.length
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
										{props?.investments?.length
											? ` + ${formatCurrency(investsSome?.totalReturnRealized)}`
											: "-"}
									</Text>
									<Text color={"#38A169"} fontSize={"1.125rem"}>
										{props?.investments?.length ? ` 200%` : "-"}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					{props?.investments?.length ? (
						<MeusInvestimentosPage
							token={props?.token}
							investments={props?.investments}
						/>
					) : (
						<EmptyInvest investments={props?.investments} />
					)}
				</Flex>
			</>
		</DefaultTemplate>
	);
};
