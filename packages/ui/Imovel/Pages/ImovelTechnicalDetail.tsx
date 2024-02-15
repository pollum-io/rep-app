import { Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import PlantaCarrousel from "../ImovelDetailComponents/PlantaCarrouselComponent";
import {
	ImovelInfoDefault,
	ObraSteps,
	PriceCard,
	TimeCard,
} from "../SharedComponents";
import { IOpportunitiesCard } from "../dtos/Oportunities";
import { UserLogin } from "../../GlobalDtos";
import { formatCurrencyWithoutSymbol } from "../../utils";
import { useTranslation } from "react-i18next";

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

export const ImovelTechnicalDetailPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	opportuntyDetails,
	usersId,
	setFirstStep,
	setSecondStep,
	setCotas,
	cotas,
	token,
}) => {
	const handleDownload = () => {
		const pdfLink =
			"../../../../apps/investor/public/images/backgrounds/Vestar_pdf.pdf";
		const link = document.createElement("a");
		link.href = pdfLink;
		link.download = "example.pdf";
		link.click();
	};
	const { t } = useTranslation();

	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex
					gap="3.9rem"
					maxWidth="70rem"
					margin={"0 auto"}
					position={"relative"}
				>
					<Flex flexDir={"column"} maxWidth={"70%"}>
						<ImovelInfoDefault imovelDetails={imovelDetails} />
						<Flex
							flexDir={"column"}
							mb="4rem"
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
										{t("opportunitieDetails.areaConstruída")}
									</Text>
									<Flex gap="0.25rem">
										<Text fontSize={"md"} color="#171923">
											{imovelDetails?.opportunities_details?.constructed_area}
											mil m²
										</Text>
									</Flex>
								</Flex>
								<Flex flexDir={"column"} gap="0.25rem" w="max">
									<Text fontSize={"sm"} fontWeight="400" color="#007D99">
										{t("opportunitieDetails.unidades")}
									</Text>
									<Flex gap="0.25rem">
										<Text fontSize={"md"} color="#171923">
											{imovelDetails?.opportunities_details?.total_units} lotes
										</Text>
									</Flex>
								</Flex>

								<Flex flexDir={"column"} gap="0.25rem" w="max">
									<Text fontSize={"sm"} fontWeight="400" color="#007D99">
										{t("opportunitieDetails.vgvEstimado")}
									</Text>
									<Flex gap="0.25rem">
										<Text fontSize={"md"} color="#171923">
											R$ {imovelDetails?.opportunities_details?.estimated_vgv}{" "}
										</Text>
									</Flex>
								</Flex>

								<Flex flexDir={"column"} gap="0.25rem" w="max">
									<Text fontSize={"sm"} fontWeight="400" color="#007D99">
										{t("opportunitieDetails.precoMedio")}
									</Text>
									<Flex gap="0.25rem">
										<Text fontSize={"md"} color="#171923">
											R${" "}
											{formatCurrencyWithoutSymbol(
												imovelDetails?.opportunities_details?.average_price
											)}{" "}
										</Text>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
						<Flex gap="0rem" maxWidth="70rem">
							<Flex flexDir={"column"} maxWidth={"100%"}>
								<Flex mt="1rem" flexDir={"column"}>
									<Text
										mb="2rem"
										fontWeight={"600"}
										fontSize="2xl"
										color={"#171923"}
									>
										{t("opportunitieDetails.registroIcorporacaoMatricula")}
									</Text>
									<Flex>
										<Flex flexDir={"column"} color={"#171923"}>
											{imovelDetails?.incorporation_enrollment?.map(
												(data, index) => (
													<>
														<ObraSteps
															key={index}
															title={data.name}
															barPercentage={data.status}
															titleWidth={"18rem"}
														/>
													</>
												)
											)}
										</Flex>
									</Flex>
								</Flex>
								<Flex flexDir={"column"} gap="5" mt="4rem">
									<Text color={"#171923"} w={"80%"}>
										{imovelDetails?.description}
									</Text>
								</Flex>
								{/* <Flex my={"2rem"} w="100%" maxWidth="70rem">
									<Text
										fontSize={"1.5rem"}
										fontWeight={"600"}
										color={"#171923"}
									>
										Cronograma estimado
									</Text>
								</Flex>
								<Flex maxWidth="70rem">
									<Flex flexDir={"row"}>
										{imovelDetails?.estimated_timeline?.map((data, index) => (
											<>
												<TimelineComponent
													key={index}
													titleWidth={"12rem"}
													data={data}
												/>
											</>
										))}
									</Flex>
								</Flex> */}
							</Flex>
						</Flex>
					</Flex>
					<Flex flexDirection="column" position={"relative"} right={"5.9rem"}>
						<Flex flexDirection="column" gap="1.5rem" flex="1">
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								url={imovelDetails?.url}
								unitPrice={imovelDetails?.min_investment}
								isEnterprise={usersId.enterprise ? true : false}
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
				<Flex my="4rem" flexDir={"column"} justifyContent="center">
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
								{t("opportunitieDetails.plantas")}
							</Text>
							<Button
								h={"max"}
								py={"2.5"}
								px={"6"}
								borderRadius={"0.6rem"}
								bgColor={"#003243c8"}
								fontSize={"0.875rem"}
								fontWeight={"500"}
								color={"#ffffff"}
								onClick={handleDownload}
							>
								{t("opportunitieDetails.baixarTodas")}
							</Button>
						</Flex>
						<Flex maxWidth="70rem">
							<PlantaCarrousel />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
