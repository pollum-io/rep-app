import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { IOpportunitiesCard } from "../../../../apps/investor/dtos/Oportunities";
import { UserInfo } from "../../../../apps/investor/dtos/GlobalUserInfo";
import PrevFinanceiraTable from "../ImovelOverviewComponents/PrevFinanceiraTable";
import PositiveAndNegativeBarChart from "../ImovelOverviewComponents/FluxoDeCaixaChart";
import { PrevisaoDeCaixaChart } from "../ImovelOverviewComponents/PrevisaoDeCaixaChart";
import { DocsComponent, PriceCard, TimeCard } from "../SharedComponents";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelOverviewPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex gap="2.75rem" maxWidth="70rem" h={"42rem"}>
					<Flex flexDir={"column"} maxWidth={"70%"} mr={"0em"}>
						<Flex flexDir={"row"} mt="1rem" justifyContent={"space-between"}>
							<Text
								mb="0.5rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								Estrutura do negócio{" "}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Flex
								w={"44.125rem"}
								bg={"#1789A3"}
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
									Sociedade em Conta de Participação
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
										color={"#007D99"}
										fontSize={"1.125rem"}
										fontWeight={"600"}
									>
										Sócios Participantes
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"500"}
									>
										Grupo Investidor
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"400"}
										textAlign={"center"}
									>
										50% do lucro líquido + reembolso dos aportes atualizados
										(IPCA)
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
										color={"#007D99"}
										fontSize={"1.125rem"}
										fontWeight={"600"}
									>
										Sócio Ostensivo (SPE){" "}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"500"}
									>
										Grupo Gestor{" "}
									</Text>
									<Text
										color={"#171923"}
										fontSize={"0.875rem"}
										fontWeight={"400"}
										textAlign={"center"}
									>
										Saldo do lucro líquido{" "}
									</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} mt="4rem" justifyContent={"space-between"}>
							<Text
								mb="0.5rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								Previsão Financeira{" "}
							</Text>
							<PrevFinanceiraTable />
							<Text
								fontSize={"0.875rem"}
								fontWeight={"400"}
								color={"#171923"}
								mt={"1rem"}
							>
								* Espaço para disclaimer: um texto que escreveremos sobre os
								valores já terem impostos descontados, comissão de venda, etc.
							</Text>
						</Flex>
					</Flex>{" "}
					<Flex
						flexDirection="column"
						position="relative"
						bottom={"14rem"}
						h={"148rem"}
					>
						<Flex
							h="188rem"
							flexDirection="column"
							gap="1.5rem"
							className="page-transition"
						>
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								id={imovelDetails?._id}
								minted={imovelDetails?.token_minted}
								price={imovelDetails?.token_price}
								supply={imovelDetails?.token_supply}
								oportunitiesAddress={imovelDetails?.token_address}
								investor_pf={usersId?.investor_pf}
								investor_pj={usersId?.investor_pj}
							/>{" "}
						</Flex>
					</Flex>{" "}
				</Flex>
				<Flex py="4rem" flexDir={"column"} justifyContent="center">
					<Flex w="100%" py="4rem" flexDir={"column"}>
						<Text
							fontSize={"1.5rem"}
							fontWeight={"600"}
							color={"#171923"}
							mb={"2rem"}
						>
							Fluxo de caixa
						</Text>
						<PositiveAndNegativeBarChart />
					</Flex>
					<Flex w="100%" py="0rem" flexDir={"column"}>
						<Text
							fontSize={"1.5rem"}
							fontWeight={"600"}
							color={"#171923"}
							mb={"1rem"}
						>
							Previsão de caixa
						</Text>
						<PrevisaoDeCaixaChart />
					</Flex>
					<DocsComponent
						title="Informações adicionais"
						isInvestPage={false}
						width="max"
					/>
				</Flex>
			</Flex>
		</>
	);
};
