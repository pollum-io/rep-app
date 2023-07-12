import { Flex, Icon, Img, SimpleGrid, Text } from "@chakra-ui/react";
import moment from "moment-timezone";
import { FunctionComponent, useState } from "react";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";
import { TbInfoSquare } from "react-icons/tb";
import {
	IOpportunitiesApprovalProcess,
	IOpportunitiesCard,
} from "../../../dtos/Oportunities";
import { UserInfo } from "../../../dtos/GlobalUserInfo";
import { Carousel } from "../Carousel";
import { MoreAbout } from "../MoreAbout";
import { PriceCard } from "../PriceCard";
import { ObraSteps } from "../ObraSteps";
import { formatDate } from "../../../utils/formatDate";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelHomePage: FunctionComponent<IImovelProps> = ({
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
				<Flex gap="2.75rem" maxWidth="70rem" h={"46rem"}>
					<Flex flexDir={"column"} maxWidth={"70%"}>
						<Flex flexDir={"column"} pb="3rem">
							<SimpleGrid
								columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
								w="fit-content"
								rowGap="2rem"
							>
								<Flex flexDir={"column"} gap="0.25rem" w="8rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										{t("opportunities.card.minInvest")}
									</Text>
									<Flex gap="0.25rem">
										<Text fontSize={"xs"} color="#718096">
											R$
										</Text>
										<Text color="#000000">{`${imovelDetails?.min_investment}`}</Text>
										<Img src="/icons/info-circle.svg" w={"1rem"} h={"1.3rem"} />
									</Flex>
								</Flex>
								<Flex flexDir={"column"} gap="0.25rem" w="7rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										{t("opportunitieDetails.start")}
									</Text>
									<Flex gap="0.25rem">
										<Text color="#000000">
											{formatDate(imovelDetails?.init_date)}
										</Text>
									</Flex>
								</Flex>
								<Flex flexDir={"column"} gap="0.25rem" w="7rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										{t("opportunities.card.estConc")}
									</Text>
									<Flex gap="0.25rem">
										<Text color="#000000">
											{formatDate(imovelDetails?.expected_delivery_date)}
										</Text>
									</Flex>
								</Flex>
								<Flex
									flexDir={"column"}
									gap="0.25rem"
									w="10.5rem"
									order={["unset", "unset", "unset", "1", "unset"]}
								>
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										{t("opportunitieDetails.expected")}
									</Text>
									<Flex gap="0.25rem" alignItems="center" w="9rem">
										<Text color="#000000">
											{imovelDetails?.profitability}%{" "}
											{t("opportunitieDetails.perYear")}
										</Text>
										<Icon as={TbInfoSquare} color={"#A0AEC0"} w={5} h={5} />
									</Flex>
								</Flex>

								<Flex flexDir={"column"} gap="0.25rem" w="9rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										Prazo total invest.
									</Text>
									<Flex gap="0.25rem">
										<Text color="#000000">2 anos</Text>
										<Img
											src="/icons/info-circle.svg"
											w={"1rem"}
											h={"1.3rem"}
											color="#A0AEC0"
										/>
									</Flex>
								</Flex>
								<Flex flexDir={"column"} gap="0.25rem" w="7rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										Retorno final{" "}
									</Text>
									<Flex gap="0.25rem">
										<Text color="#000000">200%</Text>
										<Img
											src="/icons/info-circle.svg"
											w={"1rem"}
											h={"1.3rem"}
											color="#A0AEC0"
										/>
									</Flex>
								</Flex>
							</SimpleGrid>
						</Flex>
						<Flex flexDir={"column"} gap="5">
							<Text color={"#171923"}>{imovelDetails?.description}</Text>
						</Flex>

						<Flex mt="4rem" flexDir={"column"}>
							<Text
								mb="2rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								Estado atual da obra
							</Text>
							<Flex>
								<Flex gap="8rem" flexDir={"row"}>
									<Flex flexDir={"column"} color={"#171923"}>
										<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
											Processo de aprovação
										</Text>
										{imovelDetails?.approval_process?.map(
											(data: IOpportunitiesApprovalProcess) => (
												<>
													<ObraSteps
														title={data.name}
														barPercentage={data.status}
													/>
												</>
											)
										)}
									</Flex>
									<Flex flexDir={"column"} color={"#171923"}>
										<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
											Processo de aprovação
										</Text>
										{imovelDetails?.licensing_process?.map(
											(data: IOpportunitiesApprovalProcess) => (
												<>
													<ObraSteps
														title={data.name}
														barPercentage={data.status}
													/>
												</>
											)
										)}
									</Flex>
								</Flex>
							</Flex>
							<Flex gap="8rem">
								<Flex flexDir={"column"} color={"#171923"}></Flex>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						flexDirection="column"
						position="relative"
						bottom={"12rem"}
						h={"60rem"}
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
								address={imovelDetails?.token_address}
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
					<Flex mb={"2rem"} w="100%" maxWidth="70rem">
						<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#171923"}>
							Localização
						</Text>
					</Flex>
					<Flex maxWidth="70rem">
						{/* <Maps localization={imovelDetails?.address} /> */}
						<Img src="/images/Map.png" />
					</Flex>
					<Flex
						mt="2rem"
						w="100%"
						justifyContent="space-between"
						maxWidth="70rem"
						gap="3rem"
					>
						<Flex flexDir={"column"} gap="1rem" w="34.875rem">
							<Text fontWeight={"600"} color={"#171923"}>
								{imovelDetails?.address?.street},{" "}
								{imovelDetails?.address?.neighborhood},{" "}
								{imovelDetails?.address?.state}
							</Text>
							<Text fontSize={"sm"} color={"#171923"}>
								{imovelDetails?.neighbor_description}
							</Text>
						</Flex>
						<Flex>
							<Carousel
								extra_images={imovelDetails?.pictures_neighbor}
								widthValue="30rem"
								heightValue="15rem"
							/>
						</Flex>
					</Flex>
					<Flex w="100%" py="4rem" flexDir={"column"}>
						<Text
							fontSize={"1.5rem"}
							fontWeight={"600"}
							color={"#171923"}
							mb={"2rem"}
						>
							Conheça mais sobre essa oportunidade
						</Text>
						<MoreAbout />
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
