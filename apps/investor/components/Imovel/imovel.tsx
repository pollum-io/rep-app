import { Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin } from "react-icons/fi";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { useOpportunities } from "../../hooks/useOpportunities";
import { Collections } from "./Collections";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { ImovelDetailPage } from "./Pages/ImovelDetail";
import { ImovelHomePage } from "./Pages/ImovelHomePage";
import { ImovelMarketPage } from "./Pages/ImovelMarketPage";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelDetail: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	const { hasToken } = useOpportunities();
	const [cota] = useState<number>(0);
	const { t } = useTranslation();
	const [page, setPage] = useState("oportunidade");

	return (
		<>
			<Flex px="5rem" flexDir={"column"} alignItems="center">
				<Flex w="70rem" h="100%" gap={"4"} justifyContent="start" mt={"2rem"}>
					<Button
						bg={page === "oportunidade" ? "#B1D8DF" : "transparent"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={page === "oportunidade" ? "#00262D" : "#718096"}
						borderRadius={"1rem"}
						w={"max"}
						h={"max"}
						py={"2"}
						px={"4"}
						_hover={{ color: "#007D99" }}
						onClick={() => setPage("oportunidade")}
					>
						Oportunidade
					</Button>
					<Button
						bg={page === "detalhamento" ? "#B1D8DF" : "transparent"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={page === "detalhamento" ? "#00262D" : "#718096"}
						borderRadius={"1rem"}
						w={"max"}
						h={"max"}
						py={"2"}
						px={"4"}
						_hover={{ color: "#007D99" }}
						onClick={() => setPage("detalhamento")}
					>
						Detalhamento
					</Button>
					<Button
						bg={page === "resumo" ? "#B1D8DF" : "transparent"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={page === "resumo" ? "#00262D" : "#718096"}
						borderRadius={"1rem"}
						w={"max"}
						h={"max"}
						py={"2"}
						px={"4"}
						_hover={{ color: "#007D99" }}
						onClick={() => setPage("resumo")}
					>
						Resumo
					</Button>
					<Button
						bg={page === "visao geral" ? "#B1D8DF" : "transparent"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={page === "visao geral" ? "#00262D" : "#718096"}
						borderRadius={"1rem"}
						w={"max"}
						h={"max"}
						py={"2"}
						px={"4"}
						_hover={{ color: "#007D99" }}
						onClick={() => setPage("visao geral")}
					>
						Visão geral
					</Button>
				</Flex>
				<Collections images={imovelDetails?.pictures_enterprise} />
				<Flex gap="2.75rem" maxWidth="70rem">
					<Flex flexDir={"column"}>
						<Flex gap="0.5rem" pb="0.5rem">
							<Img
								w="6"
								h="6"
								src={`/api/file/${imovelDetails?.enterprise_logo}`}
							/>
							<Text fontWeight={"400"} color="#171923">
								{imovelDetails?.enterprise_name}
							</Text>
						</Flex>
						<Flex gap="0.4rem" pb="1rem" flexDir={"column"} w={"max"}>
							{imovelDetails?.name && (
								<Text fontSize="4xl" fontWeight={"600"} color="#171923">
									{imovelDetails?.name}
								</Text>
							)}
							<Flex gap={"1rem"}>
								<Text
									fontSize={"sm"}
									fontWeight="400"
									color="#171923"
									bgColor="#F0E8FF"
									py="0.25rem"
									px="1rem"
									borderRadius={"4.875rem"}
									w="max"
								>
									{imovelDetails?.enterprise_type}
								</Text>
								{cota > 0 && (
									<Flex
										bgColor="#F0E8FF"
										py="0.25rem"
										px="1rem"
										borderRadius={"4.875rem"}
										fontSize={"sm"}
										color="#171923"
										gap="0.25rem"
										display={!hasToken ? "flex" : "none"}
										w="max"
									>
										<Text w="max" fontWeight="400">
											{t("opportunitieDetails.youHave")}
										</Text>
										<Text w="max" fontWeight="600">
											{cota} {t("opportunitieDetails.yourShares")}
										</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
						<Flex gap="0.625rem" pb="1.5rem">
							<Icon w="1.25rem" h="1.5rem" color={"#718096"} as={FiMapPin} />
							<Text color={"#718096"}>
								{" "}
								{`${imovelDetails?.address?.street}, ${imovelDetails?.address?.neighborhood}`}
							</Text>
						</Flex>
						{page === "oportunidade" && (
							<ImovelHomePage imovelDetails={imovelDetails} usersId={usersId} />
						)}
						{page === "detalhamento" && (
							<ImovelDetailPage
								imovelDetails={imovelDetails}
								usersId={usersId}
							/>
						)}
						{page === "mercado" && (
							<ImovelMarketPage
								imovelDetails={imovelDetails}
								usersId={usersId}
							/>
						)}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
