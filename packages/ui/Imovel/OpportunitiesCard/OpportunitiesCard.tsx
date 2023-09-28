import React, { FunctionComponent } from "react";
import { Button, Flex, Img, Text, SimpleGrid } from "@chakra-ui/react";
import { IOpportunitiesCard } from "./dto";
import { useRouter } from "next/router";
import { FiMapPin } from "react-icons/fi";
import { useQuery as query } from "react-query";
import { formatDate } from "../../../../apps/investor/utils/formatDate";
import { Oval } from "react-loader-spinner";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";
import {
	fetchEnterpriseOpportunties,
	fetchOpportunitiesByCompany,
	fetchOpportunity,
} from "services";
import { formatCurrencyWithoutSymbol } from "../../utils";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface IOpportunitiesCompaniesCard {
	id?: string;
	investorId?: string;
	enterpriseData?: string[];
	token?: string;
	isPortfolio?: boolean;
	host?: string;
	isEnterprise?: boolean;
	setFirstStep?: any;
	setSecondStep?: any;
	setCotas?: any;
	enterpriseId?: string;
}

export const OpportunitiesCard: FunctionComponent<
	IOpportunitiesCompaniesCard
> = ({
	id,
	isEnterprise,
	setFirstStep,
	setSecondStep,
	setCotas,
	enterpriseId,
	token,
}) => {
	const currentTime = new Date();
	const router = useRouter();
	const { t, i18n } = useTranslation();
	const { language } = i18n;

	const { data: cardsInfo, isLoading } = query(
		["oportunity", router.query],
		() =>
			id
				? fetchOpportunitiesByCompany(router.query)
				: fetchOpportunity(router.query),
		{
			refetchOnWindowFocus: false,
			refetchInterval: false,
		}
	);

	const { data: opportunitiesEnterprise } = query(
		["oportunityEnterprise", id],
		() => fetchEnterpriseOpportunties(enterpriseId, token),
		{
			refetchOnWindowFocus: false,
			refetchInterval: false,
		}
	);

	const renderer = ({
		days,
		hours,
		minutes,
		completed,
	}: CountdownRenderProps) => {
		if (completed) {
			return "Encerrado";
		} else {
			return (
				<Text
					fontFamily="Poppins"
					fontWeight="500"
					fontSize="0.75rem"
					lineHeight="1rem"
					color="#FFFFFF"
					id="timer"
				>
					{days} dias {hours} horas {minutes} min
				</Text>
			);
		}
	};

	return (
		<>
			{cardsInfo !== undefined && !isLoading ? (
				(!isEnterprise
					? cardsInfo?.opportunities
					: opportunitiesEnterprise
				)?.map((cards: IOpportunitiesCard) => (
					<Flex
						key={cards._id}
						w="19.125rem"
						h={isEnterprise ? "max" : "24.5625rem"}
						background="#FFFFFF"
						boxShadow="0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.05)"
						borderRadius="0.75rem"
						flexDirection="column"
						_hover={{
							cursor: "pointer",
							boxShadow:
								"0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
						}}
						mr={isEnterprise ? "1.5rem" : "unset"}
						transition="150ms"
						onClick={() => {
							router.push({
								pathname: `/oportunidades/${cards.url}`,
							});
							setFirstStep(true);
							setSecondStep(false);
							setCotas(0);
						}}
					>
						<Flex
							w="100%"
							h="12.75rem"
							borderRadius="0.75rem"
							justifyContent="end"
						>
							<Img
								src={`${url}/file/${
									isEnterprise
										? cards?.images && cards?.images[0]
										: cards.pictures_enterprise[0]
								}`}
								borderRadius="0.75rem"
							/>
							<Flex position="absolute" pt="0.625rem" pr="0.75rem">
								<Flex
									justifyContent="center"
									alignItems="center"
									w="max-content"
									h="1.25rem"
									background="rgba(0, 0, 0, 0.36)"
									borderRadius="2.6875rem"
									px="0.5rem"
									py="0.125rem"
								>
									{currentTime >= new Date(cards?.sale_end_at) ? (
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#FFFFFF"
										>
											{t("opportunities.card.closed")}
										</Text>
									) : (
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#FFFFFF"
										>
											{cards?.isAvailable ? (
												t("opportunities.card.available")
											) : (
												<Countdown
													date={cards?.sale_end_at}
													renderer={renderer}
												/>
											)}
										</Text>
									)}
								</Flex>
							</Flex>
						</Flex>
						<Flex mt="1rem" px="1rem" flexDirection="column" pb="0.9375rem">
							<Flex gap="0.3125rem" flexDirection="column">
								<Flex gap="0.5rem" alignItems="center">
									{!cards.isPortfolio && (
										<Img
											w={4}
											h={4}
											src={`${url}/file/${cards.enterprise_logo}`}
										/>
									)}
									<Text
										fontFamily="Poppins"
										fontWeight="500"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#171923"
									>
										{cards.name}
									</Text>
								</Flex>
								<Flex gap="0.5rem">
									<FiMapPin color="#718096" />
									<Text
										fontFamily="Poppins"
										fontSize="0.75rem"
										lineHeight="1rem"
										alignItems="center"
										color="#718096"
									>
										{`${cards.address.neighborhood}, ${cards.address.state}`}
									</Text>
								</Flex>
								<Flex alignItems="center" color="#2D3748">
									<Text
										fontFamily="Poppins"
										fontSize="0.75rem"
										lineHeight="1rem"
										color="#2D3748"
									>
										{cards.enterprise_type}
									</Text>
								</Flex>
							</Flex>

							<Flex flexDirection="column" gap="1rem" mt="1.5rem">
								{!isEnterprise ? (
									<Flex
										alignItems="center"
										justifyContent="space-between"
										w="100%"
									>
										<Flex flexDirection="column" alignItems="left">
											<Text
												fontSize="0.75rem"
												lineHeight="1rem"
												color="#718096"
											>
												{t("opportunities.card.minInvest")}
											</Text>
											<Flex gap="0.25rem" fontFamily="Poppins">
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													R$
												</Text>
												<Text
													mt="0.0625rem"
													fontSize="1rem"
													lineHeight="1.5rem"
													color="#171923"
												>
													{cards.min_investment}
												</Text>
											</Flex>
										</Flex>
										<Flex
											flexDirection="column"
											alignItems="left"
											fontFamily="Poppins"
										>
											<Text
												fontSize="0.75rem"
												lineHeight="1rem"
												color="#718096"
											>
												{t("opportunities.card.estConc")}
											</Text>
											<Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
												{formatDate(cards.expected_delivery_date)}
											</Text>
										</Flex>
									</Flex>
								) : (
									<Flex flexDir={"column"} gap={"0.75rem"}>
										<Flex
											alignItems="center"
											justifyContent="space-between"
											w="100%"
										>
											<Flex flexDirection="column" flex={"1.6"}>
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													Total recebido{" "}
												</Text>
												<Flex gap="0.25rem" fontFamily="Poppins">
													<Text
														fontSize="0.75rem"
														lineHeight="1rem"
														color="#718096"
													>
														R$
													</Text>
													<Text
														mt="0.0625rem"
														fontSize="1rem"
														lineHeight="1.5rem"
														color="#171923"
													>
														{formatCurrencyWithoutSymbol(cards?.totalRaised)}
													</Text>
												</Flex>
											</Flex>
											<Flex
												flexDirection="column"
												flex={"1"}
												fontFamily="Poppins"
											>
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													Cotistas{" "}
												</Text>
												<Text
													fontSize="1rem"
													lineHeight="1.5rem"
													color="#171923"
												>
													{cards?.shareholders}
												</Text>
											</Flex>
										</Flex>
										<Flex
											alignItems="center"
											justifyContent="space-between"
											w="100%"
										>
											<Flex flexDirection="column" flex={"1.6"}>
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													Previsão de aportes{" "}
												</Text>
												<Flex gap="0.25rem" fontFamily="Poppins">
													<Text
														fontSize="0.75rem"
														lineHeight="1rem"
														color="#718096"
													>
														R$
													</Text>
													<Text
														mt="0.0625rem"
														fontSize="1rem"
														lineHeight="1.5rem"
														color="#171923"
													>
														{formatCurrencyWithoutSymbol(
															cards?.contributionForecast
														)}
													</Text>
												</Flex>
											</Flex>
											<Flex
												flexDirection="column"
												flex={"1"}
												fontFamily="Poppins"
											>
												<Text
													fontSize="0.75rem"
													lineHeight="1rem"
													color="#718096"
												>
													Ass. pendentes
												</Text>
												<Text
													fontSize="1rem"
													lineHeight="1.5rem"
													color="#171923"
												>
													{cards?.pendingSubscribers}
												</Text>
											</Flex>
										</Flex>
									</Flex>
								)}
								{!isEnterprise ? (
									<Flex
										w="max"
										background="#E4F2F3"
										borderRadius="2.6875rem"
										py="0.125rem"
										px={language === "pt-br" ? "1" : "3"}
									>
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#00576B"
										>
											{t("opportunities.card.expectedp/y", {
												symbol1: cards?.profitability,
											})}
										</Text>
									</Flex>
								) : (
									<Flex
										w="100%"
										background="#E4F2F3"
										borderRadius="2.6875rem"
										py="0.125rem"
										px={language === "pt-br" ? "1" : "3"}
									>
										<Text
											fontFamily="Poppins"
											fontWeight="500"
											w={"100%"}
											fontSize="0.75rem"
											lineHeight="1rem"
											textAlign={"center"}
											color="#00576B"
										>
											{cards?.totalRaised !== undefined &&
												cards?.contributionForecast !== undefined &&
												(
													(cards.totalRaised / cards.contributionForecast) *
													100
												).toFixed(2)}
											% da meta alcançada
										</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
					</Flex>
				))
			) : (
				<Flex
					ml="45rem"
					w={"100%"}
					h="10rem"
					justifyContent={"center"}
					alignItems="center"
				>
					<Oval
						height={70}
						width={70}
						color="#1789A3"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#bdbdbd"
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				</Flex>
			)}
		</>
	);
};

export const OpportunitiesCards: FunctionComponent<
	IOpportunitiesCompaniesCard
> = ({
	id,
	investorId,
	enterpriseData,
	isPortfolio,
	host,
	token,
	setFirstStep,
	setSecondStep,
	setCotas,
}) => {
	return (
		<SimpleGrid
			columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
			spacing="1.5rem"
			w="fit-content"
			rowGap="2rem"
		>
			<OpportunitiesCard
				id={id}
				investorId={investorId}
				enterpriseData={enterpriseData}
				isPortfolio={isPortfolio}
				host={host}
				token={token}
				setFirstStep={setFirstStep}
				setCotas={setCotas}
				setSecondStep={setSecondStep}
			/>
		</SimpleGrid>
	);
};
