import { Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import {
	IOpportunitiesApprovalProcess,
	IOpportunitiesCard,
} from "../../../../apps/investor/dtos/Oportunities";
import { UserInfo } from "../../../../apps/investor/dtos/GlobalUserInfo";
import { TimelineComponentData } from "../ImovelDetailComponents/TimelineComponentData";
import PlantaCarrousel from "../ImovelDetailComponents/PlantaCarrouselComponent";
import { TimelineComponent } from "../ImovelDetailComponents";
import { ObraSteps, PriceCard, TimeCard } from "../SharedComponents";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelTechnicalDetailPage: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	return (
		<>
			<Flex flexDir={"column"} alignItems="flex-start">
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
						bottom={"24.1rem"}
						h={"90rem"}
					>
						<Flex h="98rem" flexDirection="column" gap="1.5rem">
							<TimeCard imovelDetails={imovelDetails} />
							<PriceCard
								id={imovelDetails?._id}
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
								{TimelineComponentData.map((data) => (
									<>
										<TimelineComponent
											key={data.id}
											status={data.monthStatus}
											title={data.title}
											descriptions={data.descriptions}
											titleWidth={"12rem"}
										/>
									</>
								))}
							</Flex>
							<Flex flexDir={"column"} color={"#171923"}>
								<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
									2023{" "}
								</Text>
								{TimelineComponentData.map((data) => (
									<>
										<TimelineComponent
											key={data.id}
											status={data.monthStatus}
											title={data.title}
											descriptions={data.descriptions}
											titleWidth={"12rem"}
										/>
									</>
								))}
							</Flex>
							<Flex flexDir={"column"} color={"#171923"}>
								<Text fontWeight={"600"} color={"#171923"} pb={"1rem"}>
									2024{" "}
								</Text>
								{TimelineComponentData.map((data) => (
									<>
										<TimelineComponent
											key={data.id}
											status={data.monthStatus}
											title={data.title}
											descriptions={data.descriptions}
											titleWidth={"12rem"}
										/>
									</>
								))}
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
				</Flex>
			</Flex>
		</>
	);
};
