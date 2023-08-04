import { Flex, Img, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { IOpportunitiesCard } from "../../../../apps/investor/dtos/Oportunities";
import { UserInfo } from "../../../../apps/investor/dtos/GlobalUserInfo";
import Table from "../ImovelAportesComponents/AportesTable";
import { DocsComponent, PriceCard, TimeCard } from "../SharedComponents";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelAportesPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex gap="2.75rem" maxWidth="70rem" h={"50rem"}>
					<Flex flexDir={"column"}>
						<Flex flexDir={"row"} maxWidth={"70%"} mr={"0rem"} gap={"1.7rem"}>
							<Flex flexDir={"column"}>
								<Flex alignItems={"baseline"} gap={"1.5"}>
									<Text
										fontSize={"1.5rem"}
										fontWeight={"600"}
										color={"#171923"}
										mb={"2rem"}
									>
										Cronograma de aportes
									</Text>
									<Img src="/icons/info-circle-littlegray.svg" />
								</Flex>
								<Table isCronograma={true} />
							</Flex>
							<Flex flexDir={"column"}>
								<Text
									fontSize={"1.5rem"}
									fontWeight={"600"}
									color={"#171923"}
									mb={"2rem"}
								>
									Previsão de retorno
								</Text>
								<Table isCronograma={false} />
							</Flex>
						</Flex>
						<Flex mt={"1.5rem"} mb={"1rem"} w={"95%"}>
							<Text fontSize={"0.875rem"}>
								Os retornos serão reembolsados a partir das receitas advindas
								das vendas. Os valores aportados como adiantamento serão
								devolvidos corrigidos pelo IPCA. Ao final, os resultados obtidos
								(lucros) serão divididos em igualdade entre grupo gestor e grupo
								investidor.
							</Text>
						</Flex>
					</Flex>
					<Flex
						flexDirection="column"
						position="relative"
						bottom={"14rem"}
						h={"92rem"}
					>
						<Flex h="92rem" flexDirection="column" gap="1.5rem">
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
					</Flex>
				</Flex>
				<Flex py="4rem" flexDir={"column"} justifyContent="center">
					<DocsComponent title="Informações adicionais" />
				</Flex>
			</Flex>
		</>
	);
};
