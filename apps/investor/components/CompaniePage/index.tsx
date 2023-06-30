import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
	ICompaniesDetails,
	ICompaniesTeam,
} from "../Companies/CompaniesCard/dto";
import { OpportunitiesCards } from "../Opportunities/OpportunitiesCard/OpportunitiesCard";
import {
	CompanieContact,
	CompanieDetails,
	CompanieInfoInProgress,
	CompanieMembers,
} from "ui";

interface ICompanie {
	companieDetail: ICompaniesDetails;
}

export const CompaniePage: FunctionComponent<ICompanie> = ({
	companieDetail,
}) => {
	const { t } = useTranslation();
	return (
		<Flex flexDirection="column" gap="2rem" mt="6.25rem" mb="4.5rem">
			<Flex
				flexDirection="column"
				w="100%"
				px="5rem"
				justifyContent="center"
				alignItems="center"
			>
				<Flex w="100%" maxWidth="70rem">
					<Flex justifyContent="space-between" gap="2.75rem">
						<Flex flexDirection="column">
							<Flex>
								<CompanieDetails
									logo={`/api/file/${companieDetail?.enterprise_logo}`}
									banner={`/api/file/${companieDetail?.enterprise_banner}`}
									name={companieDetail?.enterprise_name}
									id={`CNPJ: ${companieDetail?.cnpj}`}
									location={`${companieDetail?.address?.street}, ${companieDetail?.address?.neighborhood} - ${companieDetail?.address?.state}`}
									description={companieDetail?.description}
								/>
							</Flex>
							<CompanieInfoInProgress
								delivered={
									companieDetail?.enterprise_info?.delivered_enterprises
								}
								inProgress={companieDetail?.enterprise_info?.in_progress}
								livnProp={companieDetail?.enterprise_info?.enterprises_livn}
								vgv={companieDetail?.enterprise_info?.total_vgv}
							/>
							<Flex gap="5.75rem" mt="8.5rem">
								<Flex
									flexDirection="column"
									fontFamily="Poppins"
									fontWeight="600"
									fontSize="1.5rem"
									lineHeight="2rem"
									color="#171923"
								>
									<Text>{t("companieDetails.whoBuilds")}</Text>

									{companieDetail?.team?.map(
										(team: ICompaniesTeam, index: number) => (
											// eslint-disable-next-line react/jsx-key
											<CompanieMembers
												key={index}
												name={team.name}
												occupation={team.position}
												image={team.image}
											/>
										)
									)}
								</Flex>
							</Flex>
						</Flex>
						<Flex>
							<Flex h="100%">
								<CompanieContact
									website={companieDetail?.site_url}
									whats={companieDetail?.contact_number}
									phone={companieDetail?.contact_number}
									email={companieDetail?.email}
									instagram={companieDetail?.social_media.instagram}
									twitter={companieDetail?.social_media.twitter}
									facebook={companieDetail?.social_media.facebook}
									telegram={companieDetail?.social_media.telegram}
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					mt="8.5rem"
					alignItems="center"
					flexDirection="column"
					gap="2rem"
					w="100%"
					maxWidth="70rem"
				>
					<Text
						fontFamily="Poppins"
						fontWeight="600"
						fontSize="1.5rem"
						lineHeight="2rem"
						color="#171923"
						w="100%"
					>
						{t("companieDetails.opportunities")}
					</Text>
				</Flex>
			</Flex>
			<Flex px="1.5rem" w="100%" justifyContent="center">
				<OpportunitiesCards id={companieDetail?._id} />
			</Flex>
		</Flex>
	);
};
