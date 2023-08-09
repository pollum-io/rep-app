import React from "react";
import {
	Button,
	Flex,
	Icon,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { IEmpreendimentoData } from "../../dtos/IEmpreendimentoMeuInvestimento";
import { ImoveisTableRow } from "./ImoveisTable/Row";
import { ImoveisTableHeader } from "./ImoveisTable/ImoveisTableHeader";
import { ContributionScheduleTable } from "./ContributionScheduleTable";
import Table from "ui/Imovel/ImovelAportesComponents/AportesTable";
import { DocsComponent } from "ui/Imovel/SharedComponents";
import { GrFormClose } from "react-icons/gr";

export const InvestmentDetailsModal: React.FC<IEmpreendimentoData> = (
	props
) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} size={"6xl"}>
			<ModalOverlay />
			<ModalContent w={"100%"} borderRadius={"1.5rem"}>
				<Flex
					w={"100%"}
					pl="1.5rem"
					pr={"0.5rem"}
					py={"1.5rem"}
					flexDir={"column"}
					maxHeight="90vh"
				>
					<Flex flexDir={"column"} overflowY="auto" className="scrollbarInvest">
						<Flex
							mb={"2rem"}
							alignItems={"center"}
							justifyContent={"space-between"}
						>
							<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
								Detalhes do investimento{" "}
							</Text>
							<Flex
								gap={"0.5rem"}
								alignItems={"center"}
								pr={"1rem"}
								onClick={() => props.onClose()}
								_hover={{ cursor: "pointer", opacity: 0.7 }}
							>
								<Text color={"#171923"}>Fechar</Text>
								<GrFormClose size={"1.2rem"} />
							</Flex>
						</Flex>
						<Flex flexDir={"column"} mb={"4.125rem"} w={"99%"}>
							<ImoveisTableHeader />
							<ImoveisTableRow
								acao={props.data?.acao}
								conclusao={props.data?.conclusao}
								cotas={props.data?.cotas}
								descLucratividade={props.data?.descLucratividade}
								empreendimento={props.data?.empreendimento}
								inicioInvest={props.data?.inicioInvest}
								lucratividade={props.data?.lucratividade}
								porcentagem={props.data?.porcentagem}
								prev={props.data?.prev}
								status={props.data?.status}
								tipoDoEmpreendiment0={props.data?.tipoDoEmpreendiment0}
								totalInvestido={props.data?.totalInvestido}
								isModal={true}
							/>
						</Flex>
						<Flex mb={"2rem"} flexDir={"column"} gap={"0.75rem"}>
							<Flex alignItems={"center"} mb={"2rem"} gap={"0.75rem"}>
								<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
									Cronograma de aportes{" "}
								</Text>
								<Img src="/icons/info-circle-littlegray.svg" />
							</Flex>
							<ContributionScheduleTable />
							<Text
								fontSize={"0.875rem"}
								color={"#171923"}
								w={"60%"}
								mt={"1rem"}
							>
								Espaço pra alguma explicação se necessário. Lorem ipsum dolor
								sit amet consectetur. A molestie at lacus lobortis orci id
								tellus mi. Adipiscing non pellentesque pellentesque bibendum in
								dui. Accumsan pulvinar nisi eu ridiculus.
							</Text>
						</Flex>
						<Flex mb={"2rem"} flexDir={"column"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"2rem"}
							>
								Previsão de retorno{" "}
							</Text>
							<Table />
							<Text
								fontSize={"0.875rem"}
								color={"#171923"}
								w={"60%"}
								mt={"1rem"}
							>
								Espaço pra alguma explicação se necessário. Lorem ipsum dolor
								sit amet consectetur. A molestie at lacus lobortis orci id
								tellus mi. Adipiscing non pellentesque pellentesque bibendum in
								dui. Accumsan pulvinar nisi eu ridiculus.
							</Text>
						</Flex>
						<Flex mb={"2rem"} flexDir={"column"} w={"100%"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"2rem"}
							>
								Contrato
							</Text>
							<DocsComponent isInvestPage={true} width="60%" />
						</Flex>
						<Flex justifyContent={"center"}>
							<Button
								px={"1rem"}
								py={"0.625rem"}
								w={"17.25rem"}
								bgColor={"#1789A3"}
								color={"#fff"}
								fontWeight={"500"}
								_hover={{ opacity: 0.7 }}
								onClick={() => props.onClose()}
							>
								Ok, entendi
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
