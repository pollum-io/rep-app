import { Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment-timezone";
import { FunctionComponent, useState } from "react";
import Countdown from "react-countdown";
import { CountdownRenderProps } from "react-countdown/dist/Countdown";
import { useTranslation } from "react-i18next";
import {
	IOpportunitiesApprovalProcess,
	IOpportunitiesCard,
} from "../../../dtos/Oportunities";
import { UserInfo } from "../../../dtos/GlobalUserInfo";
import { MoreAbout } from "../MoreAbout";
import { PriceCard } from "../PriceCard";
import { ObraSteps } from "../ObraSteps";
import { TimelineComponent } from "../TimelineComponent";
import PlantaCarrousel from "../PlantaCarrouselComponent";
import { useKeenSlider } from "keen-slider/react";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelDetailPage: FunctionComponent<IImovelProps> = ({
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
				<Flex
					flexDir={"column"}
					pb="1rem"
					w={"100%"}
					position="relative"
					right={"14.2rem"}
				>
					<Flex
						gap={"2rem"}
						w="max"
						border={"1px solid #E5E7EB"}
						borderRadius={"1rem"}
						py={"1.5rem"}
						pr={"2rem"}
						justifyContent="flex-end"
						borderLeft={"none"}
						pl={{
							sm: "24px",
							md: "14rem",
							lg: "14rem",
							xl: "14rem",
							"2xl": "14rem",
						}}
						borderLeftRadius={"none"}
					>
						<Flex flexDir={"column"} gap="0.25rem" w="max">
							<Text fontSize={"sm"} fontWeight="400" color="#007D99">
								Área construída{" "}
							</Text>
							<Flex gap="0.25rem">
								<Text fontSize={"md"} color="#171923">
									84.364,82 m²{" "}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap="0.25rem" w="max">
							<Text fontSize={"sm"} fontWeight="400" color="#007D99">
								Unidades
							</Text>
							<Flex gap="0.25rem">
								<Text fontSize={"md"} color="#171923">
									69 lotes{" "}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap="0.25rem" w="max">
							<Text fontSize={"sm"} fontWeight="400" color="#007D99">
								À venda
							</Text>
							<Flex gap="0.25rem">
								<Text fontSize={"md"} color="#171923">
									30 lotes{" "}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap="0.25rem" w="max">
							<Text fontSize={"sm"} fontWeight="400" color="#007D99">
								VGV estimado{" "}
							</Text>
							<Flex gap="0.25rem">
								<Text fontSize={"md"} color="#171923">
									R$ 13.110.000,000{" "}
								</Text>
							</Flex>
						</Flex>

						<Flex flexDir={"column"} gap="0.25rem" w="max">
							<Text fontSize={"sm"} fontWeight="400" color="#007D99">
								Preço médio{" "}
							</Text>
							<Flex gap="0.25rem">
								<Text fontSize={"md"} color="#171923">
									R$ 190.000,000{" "}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex gap="2.75rem" maxWidth="70rem" h={"36rem"}>
					<Flex flexDir={"column"} maxWidth={"70%"}>
						<Flex mt="1rem" flexDir={"column"}>
							<Text
								mb="2rem"
								fontWeight={"600"}
								fontSize="2xl"
								color={"#171923"}
							>
								Registro de incorporação e matrícula{" "}
							</Text>
							<Flex>
								<Flex flexDir={"column"} color={"#171923"}>
									{imovelDetails?.incorporation_enrollment?.map(
										(data: IOpportunitiesApprovalProcess) => (
											<>
												<ObraSteps
													title={data.name}
													barPercentage={data.status}
													titleWidth={"18rem"}
												/>
											</>
										)
									)}
								</Flex>
							</Flex>
							<Flex gap="8rem">
								<Flex flexDir={"column"} color={"#171923"}></Flex>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap="5" mt="4rem">
							<Text color={"#171923"}>{imovelDetails?.description}</Text>
						</Flex>
					</Flex>
					<Flex
						flexDirection="column"
						position="relative"
						bottom={"20rem"}
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
							Cronograma estimado
						</Text>
					</Flex>
					<Flex maxWidth="70rem">
						<Flex>
							<Flex flexDir={"column"} color={"#171923"}>
								<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
									2022{" "}
								</Text>
								{imovelDetails?.incorporation_enrollment?.map(
									(data: IOpportunitiesApprovalProcess) => (
										<>
											<TimelineComponent
												descriptionOne="Descrição etapa 1"
												descriptionTwo="Descrição etapa 2"
												descriptionThree="Descrição etapa 3"
												descriptionFour="Descrição etapa 4"
												barPercentage={data.status}
												titleWidth={"12rem"}
											/>
										</>
									)
								)}
							</Flex>
							<Flex flexDir={"column"} color={"#171923"}>
								<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
									2023{" "}
								</Text>
								{imovelDetails?.incorporation_enrollment?.map(
									(data: IOpportunitiesApprovalProcess) => (
										<>
											<TimelineComponent
												descriptionOne="Descrição etapa 1"
												descriptionTwo="Descrição etapa 2"
												descriptionThree="Descrição etapa 3"
												descriptionFour="Descrição etapa 4"
												barPercentage={data.status}
												titleWidth={"12rem"}
											/>
										</>
									)
								)}
							</Flex>
							<Flex flexDir={"column"} color={"#171923"}>
								<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
									2024{" "}
								</Text>
								{imovelDetails?.incorporation_enrollment?.map(
									(data: IOpportunitiesApprovalProcess) => (
										<>
											<TimelineComponent
												descriptionOne="Descrição etapa 1"
												descriptionTwo="Descrição etapa 2"
												descriptionThree="Descrição etapa 3"
												descriptionFour="Descrição etapa 4"
												barPercentage={data.status}
												titleWidth={"18rem"}
											/>
										</>
									)
								)}
							</Flex>
						</Flex>
					</Flex>
					<Flex
						mt="4rem"
						w="100%"
						justifyContent="space-between"
						maxWidth="70rem"
						gap="3rem"
						flexDir={"column"}
					>
						<Flex w="100%" maxWidth="70rem" justifyContent={"space-between"}>
							<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#171923"}>
								Plantas{" "}
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
						<Flex maxWidth="70rem">
							<PlantaCarrousel />
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
