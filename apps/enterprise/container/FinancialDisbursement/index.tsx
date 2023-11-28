import React, { FunctionComponent, useLayoutEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { motion } from "framer-motion";
import {
	EmpreendimentoComponent,
	FaturasDetails,
	IContribution,
	ResumoFaturasComponent,
	UserDataPF,
	UserDataPJ,
	UserLogin,
} from "ui";

interface UserData {
	token?: string;
	enterpriseId?: string;
	investments?: any[];
	enterpriseData: any;
	contribution?: IContribution;
}

export const FinancialDisbursementContainer: FunctionComponent<UserData> = (
	props
) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(props?.enterpriseId, props?.token);
	}, [getUserInfos, props?.enterpriseId, props?.token]);

	return (
		<DefaultTemplate>
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
				<Flex flexDir={"column"} mb={"21.4375rem"} mt={"6.25rem"}>
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
