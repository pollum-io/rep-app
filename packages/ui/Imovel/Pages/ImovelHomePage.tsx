import { Flex, Img, SimpleGrid, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../../apps/investor/utils/formatDate";
import { Maps } from "../../../../apps/investor/components/Maps/index";
import { Carousel } from "../ImovelHomePageComponents";
import {
	DocsComponent,
	ImovelInfoDefault,
	ObraSteps,
	PriceCard,
	TimeCard,
} from "../SharedComponents";
import { UserLogin } from "../../GlobalDtos";
import { IOpportunitiesCard } from "../dtos/Oportunities";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserLogin;
	setFirstStep: any;
	setSecondStep: any;
	setCotas: any;
	cotas: any;
}

export const ImovelHomePage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
	setFirstStep,
	setSecondStep,
	setCotas,
	cotas,
}) => {
	const { t } = useTranslation();
	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex gap="2.75rem" maxWidth="75rem" maxW={"max"} position={"relative"}>
					<Flex flexDir={"column"} maxWidth={"70%"}>
						<ImovelInfoDefault imovelDetails={imovelDetails} />
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
										<Img
											src="/icons/info-circle-littlegray.svg"
											w={"1rem"}
											h={"1.3rem"}
										/>
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
									w="11.5rem"
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
										<Img
											src="/icons/info-circle-littlegray.svg"
											w={"1rem"}
											h={"1.3rem"}
											color="#A0AEC0"
										/>{" "}
									</Flex>
								</Flex>

								<Flex flexDir={"column"} gap="0.25rem" w="9rem">
									<Text fontSize={"sm"} fontWeight="400" color="#718096">
										Prazo total invest.
									</Text>
									<Flex gap="0.25rem">
										<Text color="#000000">
											{imovelDetails?.opportunity_resume?.total_deadline} anos
										</Text>
										<Img
											src="/icons/info-circle-littlegray.svg"
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
										<Text color="#000000">
											{
												imovelDetails?.opportunity_resume
													?.percentage_final_return
											}
											%
										</Text>
										<Img
											src="/icons/info-circle-littlegray.svg"
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
										{imovelDetails?.approval_process?.map((data, index) => (
											<>
												<ObraSteps
													key={index}
													title={data.name}
													barPercentage={data.status}
												/>
											</>
										))}
									</Flex>
									<Flex flexDir={"column"} color={"#171923"}>
										<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
											Processo de aprovação
										</Text>
										{imovelDetails?.licensing_process?.map((data, index) => (
											<>
												<ObraSteps
													key={index}
													title={data.name}
													barPercentage={data.status}
												/>
											</>
										))}
									</Flex>
								</Flex>
							</Flex>
							<Flex gap="8rem">
								<Flex flexDir={"column"} color={"#171923"}></Flex>
							</Flex>
							<DocsComponent
								title="Estudos de mercado"
								isInvestPage={false}
								width="max"
								data={imovelDetails?.opportunity_resume_files}
							/>
						</Flex>
					</Flex>
					<Flex flexDirection="column" position={"relative"}>
						<Flex flexDirection="column" gap="1.5rem" flex="1">
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								url={imovelDetails?.url}
								investor_pf={usersId?.investor_pf}
								investor_pj={usersId?.investor_pj}
								unitPrice={imovelDetails?.min_investment}
								opportunitiesDetails={imovelDetails?.opportunities_details}
								cotas={cotas}
								setCotas={setCotas}
								setFirstStep={setFirstStep}
								setSecondStep={setSecondStep}
							/>{" "}
						</Flex>
					</Flex>
				</Flex>
				<Flex py="4rem" flexDir={"column"} justifyContent="center">
					<Flex mt={"2rem"} mb={"2rem"} w="100%" maxWidth="70rem">
						<Text fontSize={"1.5rem"} fontWeight={"600"} color={"#171923"}>
							Localização
						</Text>
					</Flex>
					<Flex maxWidth="70rem">
						<Maps localization={imovelDetails?.geolocation} />
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
				</Flex>
			</Flex>
		</>
	);
};
