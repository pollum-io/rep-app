import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { IOpportunitiesCard } from "../../../../apps/investor/dtos/Oportunities";
import PrevFinanceiraTable from "../ImovelOverviewComponents/PrevFinanceiraTable";
import PositiveAndNegativeBarChart from "../ImovelOverviewComponents/FluxoDeCaixaChart";
import { ImovelInfoDefault, PriceCard, TimeCard } from "../SharedComponents";
import dynamic from "next/dynamic";
import { UserLogin } from "../../GlobalDtos";
import { useTranslation } from "react-i18next";

const PieChartComponent = dynamic(
	async () => {
		const mod = await import("ui/Imovel/ImovelOverviewComponents/");
		return mod.PieChartComponent;
	},
	{
		ssr: false,
	}
);
interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	opportuntyDetails?: unknown;
	usersId: UserLogin;
	setFirstStep: unknown;
	setSecondStep: unknown;
	setCotas: unknown;
	cotas: unknown;
	token?: string;
}

export const ImovelOverviewPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	opportuntyDetails,
	usersId,
	setFirstStep,
	setSecondStep,
	setCotas,
	cotas,
	token,
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex gap="1rem" maxWidth="70rem" position={"relative"}>
					<Flex flexDir={"column"} maxWidth={"70%"} mr={"0em"}>
						<ImovelInfoDefault imovelDetails={imovelDetails} />

						<Flex flexDir={"row"} mt="1rem" justifyContent={"space-between"}>
							<Text
								mb="0.5rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								{t("opportunitieDetails.estruturaNegocio")}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Flex
								w={"46.125rem"}
								bg={"#003243c8"}
								alignItems={"center"}
								justifyContent={"center"}
								px={"1rem"}
								pt={"1rem"}
								pb={"3.0625rem"}
								borderTopRadius={"0.75rem"}
								zIndex={"1"}
								position={"relative"}
								top={"1.5rem"}
							>
								<Text fontSize={"1.125rem"} fontWeight={"600"} color={"white"}>
									{t("opportunitieDetails.sociedadeConta")}
								</Text>
							</Flex>
							<Flex justifyContent={"space-between"}>
								<Flex
									zIndex={"999"}
									w={"21.3125rem"}
									flexDir={"column"}
									alignItems={"center"}
									p={"1rem"}
									bg={"white"}
									borderRadius={"0.75rem"}
									gap={"0.5rem"}
									boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);"
								>
									<Text
										color={"#003243c8"}
										fontSize={"1.125rem"}
										fontWeight={"600"}
									>
										{t("opportunitieDetails.sociosParticipantes")}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"500"}
									>
										{t("opportunitieDetails.grupoInvest")}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"400"}
										textAlign={"center"}
									>
										{t("opportunitieDetails.lucroFrase")}
									</Text>
								</Flex>
								<Flex
									zIndex={"999"}
									w={"21.3125rem"}
									flexDir={"column"}
									alignItems={"center"}
									p={"1rem"}
									bg={"white"}
									borderRadius={"0.75rem"}
									gap={"0.5rem"}
									boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);"
								>
									<Text
										color={"#003243c8"}
										fontSize={"1.125rem"}
										fontWeight={"600"}
									>
										{t("opportunitieDetails.socioOstensivo")}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"500"}
									>
										{t("opportunitieDetails.grupoGestor")}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"400"}
										textAlign={"center"}
									>
										{t("opportunitieDetails.saldoLucro")}
									</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex
							flexDir={"column"}
							w={"100%"}
							mt="4rem"
							justifyContent={"space-between"}
						>
							<Text
								mb="0.5rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								{t("opportunitieDetails.previsaoFinanceira")}
							</Text>
							<PrevFinanceiraTable data={imovelDetails?.schedule_table} />
							<Flex w="100%" py="4rem" flexDir={"column"}>
								<Text
									fontSize={"1.5rem"}
									fontWeight={"600"}
									color={"#171923"}
									mb={"2rem"}
								>
									{t("opportunitieDetails.fluxoDeCaixa")}
								</Text>
								<PositiveAndNegativeBarChart
									data={imovelDetails?.schedule_table}
								/>
							</Flex>
							<Flex w="100%" pb="3rem" flexDir={"column"}>
								<Text
									fontSize={"1.5rem"}
									fontWeight={"600"}
									color={"#171923"}
									mb={"1rem"}
								>
									{t("opportunitieDetails.fluxoDeCaixa")}
								</Text>
								<PieChartComponent opData={imovelDetails} />
							</Flex>
						</Flex>
					</Flex>{" "}
					<Flex flexDirection="column" position={"relative"}>
						<Flex flexDirection="column" gap="1.5rem" flex="1">
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								url={imovelDetails?.url}
								isEnterprise={usersId.enterprise ? true : false}
								unitPrice={imovelDetails?.min_investment}
								opportunitiesDetails={imovelDetails?.opportunities_details}
								cotas={cotas}
								setCotas={setCotas}
								setFirstStep={setFirstStep}
								setSecondStep={setSecondStep}
								opportunitiesDetailsToEnteprise={opportuntyDetails}
								token={token}
							/>{" "}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
