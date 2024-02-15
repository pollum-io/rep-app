import React, { FunctionComponent, useLayoutEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { InvestPayment } from "../../components/Invest/Pages/InvestPayment";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { motion } from "framer-motion";

interface IPayment {
	imovelPayment?: unknown;
	oportunitiesAddress?: string;
	user?: UserInfo;
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
}

export const PaymentContainer: FunctionComponent<IPayment> = (
	props: IPayment
) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(
			props?.investor_pf === null ? props?.investor_pj : props?.investor_pf,
			props?.token
		);
	}, [getUserInfos, props.token, props?.investor_pj, props?.investor_pf]);

	return (
		<DefaultTemplate>
			<Flex
				w={"100%"}
				maxW={"70rem"}
				margin={"0 auto"}
				justifyContent={"center"}
				flexDir={"column"}
			>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<InvestPayment
						imovelPayment={props?.imovelPayment}
						token={props?.token}
						investor={
							props?.investor_pf === null
								? props?.investor_pj
								: props?.investor_pf
						}
						isCheckout={false}
					/>
				</motion.div>
			</Flex>
		</DefaultTemplate>
	);
};
