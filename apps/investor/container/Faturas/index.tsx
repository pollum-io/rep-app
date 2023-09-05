import React, { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { Flex, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { InvestmentModel } from "../../dtos/IInvestment";
import { FaturasDetails } from "../../components/Faturas/FaturasDetails";
import { ResumoFaturasComponent } from "../../components/Faturas/ResumoFaturas";
import { EmpreendimentoComponent } from "../../components/Faturas/EmpreendimentoComponent";
import { IContribution } from "ui";

interface UserData {
	token: string;
	user: UserInfo;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	investments?: InvestmentModel[];
	contribution?: IContribution;
}

export const FaturasContainer: FunctionComponent<UserData> = (props) => {
	const { getUserInfos } = useUser();

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
					<FaturasDetails contribution={props?.contribution} />
				</Flex>
				<Flex flexDir={"column"} mb={"11.8125rem"}>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<ResumoFaturasComponent contribution={props?.contribution} />

						{props?.contribution?.contributions.length ? (
							<EmpreendimentoComponent contribution={props?.contribution} />
						) : (
							<Flex
								flexDir={"column"}
								alignItems={"center"}
								justifyContent={"center"}
								mt={"5rem"}
							>
								<Text color={"#171923"} textAlign={"center"} w={"54%"}>
									Você não possui faturas no momento, futuras parcelas a serem
									pagas serão demonstradas aqui.
								</Text>
							</Flex>
						)}
					</motion.div>
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
