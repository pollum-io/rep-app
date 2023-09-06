import React, { useMemo, useState } from "react";
import {
	Button,
	Flex,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { IEmpreendimentoData } from "../../../dtos/IEmpreendimentoMeuInvestimento";
import { ImoveisTableRow } from "../ImoveisTable/Row";
import { ImoveisTableHeader } from "../ImoveisTable/ImoveisTableHeader";
import { GrFormClose } from "react-icons/gr";
import { CronogramaAportesComponent } from "./CronogramaAportesComponent";
import { ContratoComponent } from "./ContratoComponent";
import { PrevRetornoComponent } from "ui";
import { fetchGetInvestmentDetailByUser } from "../../../services/fetchGetInvestmentDetailByUser";

export const InvestmentDetailsModal: React.FC<IEmpreendimentoData> = (
	props
) => {
	const [data, setData] = useState();
	useMemo(() => {
		if (props.isOpen) {
			const get = async () => {
				const request = await fetchGetInvestmentDetailByUser(
					props?.data?.token,
					props?.data?._id
				);
				setData(request);
			};

			get();
			return;
		}
	}, [props?.data?._id, props?.data?.token, props.isOpen]);

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
								cota_price={props?.data?.cota_price}
								enterprise_type={props?.data?.enterprise_type}
								expected_delivery_date={props?.data?.expected_delivery_date}
								expected_rentability={props?.data?.expected_rentability}
								final_invoice={props?.data?.final_invoice}
								investor_id={props?.data?.investor_id}
								last_invoice_paid={props?.data?.last_invoice_paid}
								name={props?.data?.name}
								next_invoice={props?.data?.next_invoice}
								num_cotas={props?.data?.num_cotas}
								num_installments={props?.data?.num_installments}
								opportunity_id={props?.data?.opportunity_id}
								paid_installments={props?.data?.paid_installments}
								profitability={props?.data?.profitability}
								return_realized={props?.data?.return_realized}
								status={props?.data?.status}
								total_invested={props?.data?.total_invested}
								setEmpreendimento={props?.setEmpreendimento}
								pictures_enterprise={props?.data?.pictures_enterprise}
								isModal={true}
								_id={props?.data?._id}
							/>
						</Flex>
						{props?.data?.status === "PendingSignature" ||
						props?.data?.status === "Concluded" ? (
							<>
								<ContratoComponent
									document={props?.data?.url_unsigned_document}
									isPending={
										props?.data?.status === "PendingSignature" ? true : false
									}
									token={props?.token}
									documentKey={props?.data?.documentKey}
								/>
								<PrevRetornoComponent data={data} isMyInvest={true} />
								<CronogramaAportesComponent
									data={data}
									total_invested={props?.data?.total_invested}
								/>
							</>
						) : (
							<>
								<CronogramaAportesComponent
									data={data}
									total_invested={props?.data?.total_invested}
								/>
								<PrevRetornoComponent data={data} isMyInvest={true} />
								<ContratoComponent
									document={props?.data?.url_unsigned_document}
									documentKey={props?.data?.documentKey}
									isPending={
										props?.data?.status === "InProgress" ? false : true
									}
									token={props?.token}
								/>
							</>
						)}

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
