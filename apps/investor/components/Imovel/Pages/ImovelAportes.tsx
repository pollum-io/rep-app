import { Flex, Img, Text } from "@chakra-ui/react";
import moment from "moment-timezone";
import { FunctionComponent, useState } from "react";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";
import { IOpportunitiesCard } from "../../../dtos/Oportunities";
import { UserInfo } from "../../../dtos/GlobalUserInfo";
import { PriceCard } from "../PriceCard";
import Table from "../AportesTable";
import { DocsComponent } from "../DocsComponent";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelAportesPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	const [dateEndend, setDateEnded] = useState<string>();
	const [ended, setEnded] = useState<boolean>();
	const { t } = useTranslation();

	const renderer = ({
		days,
		hours,
		minutes,
		completed,
		props: { date },
	}: CountdownRenderProps) => {
		const dateFormated = moment(date).format("DD/MM/YYYY");
		if (completed) {
			setEnded(true);
			setDateEnded(dateFormated);
			return;
		} else {
			setEnded(false);
			return (
				<Text fontWeight="500" fontSize="1.25rem" lineHeight="2rem" id="timer">
					{t("opportunitieDetails.timer", {
						value1: days,
						value2: hours,
						value3: minutes,
					})}
				</Text>
			);
		}
	};

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
						bottom={"12rem"}
						h={"59rem"}
					>
						<Flex h="58rem" flexDirection="column" gap="1.5rem">
							{ended ? (
								<Flex
									bgColor="#E2E8F0"
									py="0.25rem"
									px="1rem"
									borderRadius={"4.875rem"}
									fontSize={"sm"}
									color="#171923"
									gap="0.25rem"
									justifyContent="center"
								>
									<Text fontWeight="400">
										{t("opportunitieDetails.closedIn")}
									</Text>
									<Text fontWeight="400">{dateEndend}</Text>
								</Flex>
							) : (
								<Flex
									flexDirection="column"
									padding="1.5rem"
									gap="0.25rem"
									w="23.125rem"
									background="#4BA3B7"
									borderRadius="0.75rem"
									fontFamily="Poppins"
									color="#FFFFFF"
									h="max-content"
								>
									<Countdown
										date={imovelDetails?.sale_end_at}
										renderer={renderer}
									/>
									<Text
										fontWeight="500"
										fontSize="1.25rem"
										lineHeight="2rem"
										id="timer"
									>
										{t("opportunitieDetails.closeSales")}
									</Text>
									<Text
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
									>
										{t("opportunitieDetails.unitPrice")}{" "}
										{imovelDetails.token_price * 2}
									</Text>
								</Flex>
							)}
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
