import { Flex, Img, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { IOpportunitiesCard } from "../../../../apps/investor/dtos/Oportunities";
import { UserInfo } from "../../../../apps/investor/dtos/GlobalUserInfo";
import Table from "../ImovelAportesComponents/AportesTable";
import { DocsComponent, PriceCard, TimeCard } from "../SharedComponents";
import { PrevRetornoComponent } from "../ImovelAportesComponents";

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
				<Flex gap="1rem" maxWidth="75rem">
					<Flex flexDir={"column"}>
						<PrevRetornoComponent isMyInvest={false} />
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
								<Table
									isCronograma={true}
									data={
										imovelDetails?.opportunity_resume?.disbursement_schedule
									}
								/>
							</Flex>
						</Flex>
						<Flex mt={"1.5rem"} mb={"1rem"} w={"95%"}>
							<Text fontSize={"0.875rem"}>
								{imovelDetails?.opportunity_resume?.return_descritption}
							</Text>
						</Flex>
						<Flex pb="4rem" flexDir={"column"} justifyContent="center">
							<DocsComponent
								title="Informações adicionais"
								isInvestPage={false}
								width="max"
								data={imovelDetails?.opportunity_resume_files}
							/>
						</Flex>
					</Flex>
					<Flex flexDirection="column" position="relative" bottom={"14rem"}>
						<Flex flexDirection="column" gap="1.5rem">
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								url={imovelDetails?.url}
								investor_pf={usersId?.investor_pf}
								investor_pj={usersId?.investor_pj}
								heightDefault={"18%"}
								unitPrice={imovelDetails?.min_investment}
								pageSize="sm"
							/>{" "}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
