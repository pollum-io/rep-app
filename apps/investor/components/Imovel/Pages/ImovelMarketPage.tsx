import { Button, Flex, Icon, Img, SimpleGrid, Text } from "@chakra-ui/react";
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

export const ImovelMarketPage: FunctionComponent<IImovelProps> = ({
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
				<Flex gap="2.75rem" maxWidth="70rem" h={"25rem"}>
					<Flex flexDir={"column"} maxWidth={"70%"} mr={"3.4rem"}>
						<Flex flexDir={"row"} mt="3rem" justifyContent={"space-between"}>
							<Text
								mb="2rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								Estudos de mercado
							</Text>
							<Button
								h={"max"}
								py={"2.5"}
								px={"6"}
								borderRadius={"0.6rem"}
								bgColor={"#1789A3"}
								fontSize={"0.875rem"}
								fontWeight={"500"}
								color={"#ffffff"}
							>
								Baixar todas{" "}
							</Button>
						</Flex>
						<Flex flexDir={"column"} gap="5">
							<Flex
								alignItems={"center"}
								gap={"1.5rem"}
								bgColor={"#F7FAFC"}
								p={"1rem"}
								borderRadius={"1rem"}
								w={"40.8125rem"}
							>
								<Img src="/icons/folder.svg" />
								<Text
									w={"32.3125rem"}
									fontSize={"0.875rem"}
									color={"#171923"}
									fontWeight={"400"}
								>
									Nome do documento/estudo
								</Text>
								<Img src="/icons/downloand.svg" />
							</Flex>
							<Flex
								alignItems={"center"}
								gap={"1.5rem"}
								bgColor={"#F7FAFC"}
								p={"1rem"}
								borderRadius={"1rem"}
							>
								<Img src="/icons/folder.svg" />
								<Text
									w={"32.3125rem"}
									fontSize={"0.875rem"}
									color={"#171923"}
									fontWeight={"400"}
								>
									Nome do documento/estudo
								</Text>
								<Img src="/icons/downloand.svg" />
							</Flex>
							<Flex
								alignItems={"center"}
								gap={"1.5rem"}
								bgColor={"#F7FAFC"}
								p={"1rem"}
								borderRadius={"1rem"}
							>
								<Img src="/icons/folder.svg" />
								<Text
									w={"32.3125rem"}
									fontSize={"0.875rem"}
									color={"#171923"}
									fontWeight={"400"}
								>
									Nome do documento/estudo
								</Text>
								<Img src="/icons/downloand.svg" />
							</Flex>
							<Flex
								alignItems={"center"}
								gap={"1.5rem"}
								bgColor={"#F7FAFC"}
								p={"1rem"}
								borderRadius={"1rem"}
							>
								<Img src="/icons/folder.svg" />
								<Text
									w={"32.3125rem"}
									fontSize={"0.875rem"}
									color={"#171923"}
									fontWeight={"400"}
								>
									Nome do documento/estudo
								</Text>
								<Img src="/icons/downloand.svg" />
							</Flex>
						</Flex>
					</Flex>
					<Flex
						flexDirection="column"
						position="relative"
						bottom={"12rem"}
						h={"39rem"}
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
