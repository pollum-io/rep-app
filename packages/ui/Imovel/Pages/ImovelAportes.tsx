import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { IOpportunitiesCard } from "../../../../apps/investor/dtos/Oportunities";
import {
	DocsComponent,
	ImovelInfoDefault,
	PriceCard,
	TimeCard,
} from "../SharedComponents";
import { PrevRetornoComponent } from "../ImovelAportesComponents";
import { UserLogin } from "../../GlobalDtos";
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

export const ImovelAportesPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	opportuntyDetails,
	usersId,
	setFirstStep,
	setSecondStep,
	setCotas,
	cotas,
	token,
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
				<Flex gap="1rem" maxWidth="75rem" position={"relative"}>
					<Flex flexDir={"column"}>
						<ImovelInfoDefault imovelDetails={imovelDetails} />
						<PrevRetornoComponent
							imovelDetails={imovelDetails}
							isMyInvest={false}
						/>
						{/* <Flex flexDir={"row"} maxWidth={"70%"} mr={"0rem"} gap={"1.7rem"}>
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
								<Table
									isCronograma={true}
									data={
										imovelDetails?.opportunity_resume?.disbursement_schedule
									}
								/>
							</Flex>
						</Flex> */}
						{/* <Flex mt={"1.5rem"} mb={"1rem"} w={"95%"}>
							<Text fontSize={"0.875rem"}>
								{imovelDetails?.opportunity_resume?.return_descritption}
							</Text>
						</Flex> */}
						<Flex pb="4rem" flexDir={"column"} justifyContent="center">
							<DocsComponent
								title={t("opportunitieDetails.informaçõesAdicionais")}
								isInvestPage={false}
								width="100%"
								data={imovelDetails?.opportunity_resume_files}
							/>
						</Flex>
					</Flex>
					<Flex flexDirection="column" position={"relative"}>
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
			</Flex>
		</>
	);
};
