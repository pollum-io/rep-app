import React, { FunctionComponent, useLayoutEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { InvestSteps } from "../../components/Invest/PaymentMethods/InvestSteps";
import { InvestCheckout } from "../../components/Invest/Pages/InvestCheckout";
import { useRegisterSteps } from "../../hooks";
import { InvestContractSign } from "../../components/Invest/Pages/InvestContractSign";
import { InvestPayment } from "../../components/Invest/Pages/InvestPayment";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { motion } from "framer-motion";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";

interface IInvest {
	imovel?: IOpportunitiesCard;
	enterprise?: ICompaniesDetails;
	oportunitiesAddress?: string;
	user?: UserInfo;
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
}

export const InvestContainer: FunctionComponent<IInvest> = (props: IInvest) => {
	const { getUserInfos } = useUser();
	const { firstStep, secondStep } = useRegisterSteps();

	const [contributionIdCheck, setContributionIdCheck] = useState();

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
				pt={"6.5rem"}
			>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={firstStep ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
					transition={{ duration: 0.5 }}
				>
					{firstStep && (
						<InvestCheckout
							imovel={props?.imovel}
							userDataPF={props?.userDataPF}
							userDataPJ={props?.userDataPJ}
							isPerfilCompleted={
								props?.userDataPF
									? props?.userDataPF?.is_profile_filled
									: props?.userDataPJ?.is_profile_filled
							}
							token={props?.token}
						/>
					)}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={secondStep ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
					transition={{ duration: 0.5 }}
				>
					{secondStep && (
						<InvestContractSign
							imovel={props?.imovel}
							token={props?.token}
							setContribution={setContributionIdCheck}
						/>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={
						!firstStep && !secondStep
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 40 }
					}
					transition={{ duration: 0.5 }}
				>
					{!firstStep && !secondStep && (
						<InvestPayment
							imovel={props?.imovel}
							enterprise={props?.enterprise}
							token={props?.token}
							investor={
								props?.investor_pf === null
									? props?.investor_pj
									: props?.investor_pf
							}
							contributionIdCheck={contributionIdCheck}
							isCheckout={true}
						/>
					)}
				</motion.div>
			</Flex>
		</DefaultTemplate>
	);
};
