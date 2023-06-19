import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Button, Flex, Img, Text, SimpleGrid } from "@chakra-ui/react";
import { IOpportunitiesCard } from "./dto";
import { useRouter } from "next/router";
import { FiMapPin } from "react-icons/fi";
import { fetchOpportunity } from "../../../services/fetchOpportunity";
import { useQuery as query } from "react-query";
import { formatDate } from "../../../utils/formatDate";
import { fetchOpportunitiesByCompany } from "../../../services/fetchOpportunitiesByCompany";
import { Oval } from "react-loader-spinner";
import { fetchGetInvestorPFById } from "../../../services";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";

interface IOpportunitiesCompaniesCard {
	id?: any;
	investorId?: any;
	enterpriseData?: any;
	token?: any;
	isPortfolio?: boolean;
	host?: any;
}

export const OpportunitiesCard: FunctionComponent<
	IOpportunitiesCompaniesCard
> = ({ id, investorId, enterpriseData, isPortfolio, host, token }) => {
	const currentTime = new Date();
	const router = useRouter();
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const isEnterprise = investorId ? false : true;
	console.log(router.query._id, "router.query");
	const { data: cardsInfo } = query(
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
	console.log(cardsInfo, "cardsInfo");
	console.log(investorId, "investorId");

	const { data: user } = query(
		["user"],
		() => fetchGetInvestorPFById(investorId, token),
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
		props: { date },
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

	const imoveisDisponiveis = useMemo(() => {
		const userOpportunties = user?.data?.opportunities_avaliable;

		const imoveisDisponiveis = cardsInfo?.data?.map((imovel: any) => {
			const isDisponivel = userOpportunties?.includes(imovel._id);
			return { ...imovel, isAvailable: isDisponivel };
		});
		return imoveisDisponiveis;
	}, [cardsInfo?.data, user?.data?.opportunities_avaliable]);

	return (
		<>
			{cardsInfo !== undefined ? (
				imoveisDisponiveis?.map((cards: IOpportunitiesCard) => (
					<Flex
						key={cards._id}
						w="18.125rem"
						h="24.5625rem"
						background="#FFFFFF"
						boxShadow="0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.05)"
						borderRadius="0.75rem"
						flexDirection="column"
						_hover={{
							cursor:
								cards?.isAvailable || isEnterprise ? "pointer" : "default",
							boxShadow:
								"0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
						}}
						transition="150ms"
						onClick={() =>
							cards?.isAvailable || isEnterprise
								? router.push({
										pathname: `/oportunidades/${cards._id}`,
										query: { id: cards._id },
								  })
								: null
						}
					>
						<Flex
							w="18.125rem"
							h="12.75rem"
							borderRadius="0.75rem"
							justifyContent="end"
						>
							<Img
								src={`/api/file/${cards.pictures_enterprise[0]}`}
								borderRadius="0.75rem"
								filter={
									(cards.token_minted === cards.token_supply ||
										currentTime >= new Date(cards?.sale_end_at) ||
										!cards?.isAvailable) &&
									!isEnterprise
										? "blur(3px)"
										: "none"
								}
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
									{cards.token_minted === cards.token_supply ||
									currentTime >= new Date(cards?.sale_end_at) ? (
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
								<Flex
									gap="0.5rem"
									alignItems="center"
									filter={
										!cards?.isAvailable && !isEnterprise ? "blur(3px)" : "none"
									}
								>
									{!cards.isPortfolio && (
										<Img
											w={4}
											h={4}
											src={`/api/file/${cards.enterprise_logo}`}
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
							{cards.isPortfolio ? (
								<Button
									justifyContent="center"
									mt="1rem"
									alignItems="center"
									w="16.125rem"
									h="1.5rem"
									border="0.0625rem solid #007D99"
									borderRadius="0.375rem"
									fontFamily="Poppins"
									fontWeight="500"
									fontSize="0.75rem"
									lineHeight="1rem"
									color="#007D99"
									_hover={{ bgColor: "#EDF2F7" }}
									opacity={"1"}
									cursor={"pointer"}
								>
									{t("opportunities.card.workProgress")}
								</Button>
							) : (
								<Flex flexDirection="column" gap="1rem" mt="1.5rem">
									<Flex
										alignItems="center"
										justifyContent="space-between"
										w="100%"
										filter={
											!cards?.isAvailable && !isEnterprise
												? "blur(3px)"
												: "none"
										}
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
									{!cards?.isAvailable ? (
										<Button
											justifyContent="center"
											alignItems="center"
											w="16.125rem"
											h="max"
											py="0.125rem"
											border="0.0625rem solid #007D99"
											borderRadius="0.375rem"
											fontFamily="Poppins"
											fontWeight="500"
											fontSize="0.75rem"
											lineHeight="1rem"
											color="#007D99"
											bgColor="#ffffff"
											_hover={{ bgColor: "#EDF2F7" }}
										>
											{currentTime >= new Date(cards?.sale_end_at)
												? t("opportunities.card.access")
												: t("opportunities.card.accessTo")}
										</Button>
									) : (
										<Flex
											justifyContent="center"
											alignItems="center"
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
									)}
								</Flex>
							)}
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

export const OpportunitiesCards: FunctionComponent<any> = ({
	id,
	investorId,
	enterpriseData,
	isPortfolio,
	host,
	token,
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
			/>
		</SimpleGrid>
	);
};
