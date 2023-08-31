import { Flex, Text, Button, Img } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { IEmpreendimentoData } from "../../../dtos/IEmpreendimentoMeuInvestimento";
import {
	formatDateOnlyDayMonthYear,
	formatDateOnlyMonthYear,
} from "../../../utils/formatDate";
import { useRouter } from "next/router";
import { formatCurrency } from "ui/utils/BRCurrency";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

export const ImoveisTableRow: FunctionComponent<IEmpreendimentoData> = (
	props
) => {
	const { push } = useRouter();

	const pageTransition = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const getStatusColorAndText = useMemo(() => {
		const getStatusColor = (status: string) => {
			switch (status) {
				case "Concluded":
					return {
						bg: "#E4F2F3",
						color: "#00576B",
						statusText: "Concluído",
						action: "Ver detalhes",
					};
				case "PendingPayment":
					return {
						bg: "#FED7D7",
						color: "#E53E3E",
						statusText: "Pagamento pendente",
						action: "Realizar pagamento",
					};
				case "PendingSignature":
					return {
						bg: "#F0E8FF",
						color: "#6E40E7",
						statusText: "Assinatura pendente",
						action: "Assinar contrato",
					};
				case "InProgress":
					return {
						bg: "#FEEBCB",
						color: "#B7791F",
						statusText: "Em Andamento",
						action: "Ver aportes e retornos",
					};
				default:
					return { bg: "white", color: "black" };
			}
		};

		return getStatusColor;
	}, []);

	const totalInvestColor = useMemo(() => {
		if (
			props?.status === "PendingSignature" ||
			props?.status === "PendingPayment"
		) {
			return "#CBD5E0";
		} else {
			return "#171923";
		}
	}, [props?.status]);

	const statusAction = getStatusColorAndText(props?.status)?.action;
	const isAssinarContrato = statusAction === "Assinar contrato";
	const isRealizarPagamento = statusAction === "Realizar pagamento";
	const isVerAportesRetornos =
		statusAction === "Ver aportes e retornos" && !props.isModal;

	const handleButtonClick = () => {
		if (isAssinarContrato) {
			window.open(props?.url_unsigned_document, "_blank");
		} else if (isRealizarPagamento) {
			push({
				pathname: `/pagamento/`,
				search: `?id=${props?.opportunity_url}`,
			});
		} else if (isVerAportesRetornos) {
			props.setEmpreendimento(props);
			props.modalOpen();
		}
	};

	return (
		<MotionFlex
			pr="1rem"
			h={"4.25rem"}
			justifyContent="space-between"
			alignItems="center"
			borderRadius={"0.75rem"}
			mb={"0.75rem"}
			cursor={!props.isModal ? "pointer" : "unset"}
			_hover={
				!props.isModal
					? {
							boxShadow:
								"0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10);",
					  }
					: null
			}
			border={!props.isModal ? "none" : "1px solid #EDF2F7"}
			w={"100%"}
		>
			<Flex
				flex="1.5"
				flexDir={"row"}
				alignItems={"center"}
				onClick={() =>
					push({
						pathname: `/oportunidades/${props?.opportunity_url}`,
					})
				}
			>
				<Flex h={"max"} mr={"0.75rem"} position="relative">
					<Img
						w={"4.25rem"}
						h={"4.25rem"}
						objectFit={"cover"}
						borderLeftRadius={"0.75rem"}
						src={`/api/file/${props?.pictures_enterprise[0]}`}
					/>
					<Flex
						position="absolute"
						top={0}
						left={0}
						width="100%"
						height="100%"
						display="flex"
						alignItems="center"
						justifyContent="center"
						opacity={0}
						transition="opacity 0.3s ease"
						bgColor="rgba(0, 0, 0, 0.5)"
						borderRadius="0.75rem"
						_hover={{ opacity: 1 }}
					>
						<Img src="/icons/export.svg" />
					</Flex>
				</Flex>
				<Flex flexDir={"column"}>
					<Text
						w={"max"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color={"#171923"}
					>
						{props?.name?.length >= 15
							? `${props?.name?.slice(0, 15)}...`
							: props?.name}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						{props?.enterprise_type}
					</Text>
				</Flex>
			</Flex>
			<Flex
				onClick={
					!props.isModal
						? () => {
								props.setEmpreendimento(props);
								props.modalOpen();
						  }
						: null
				}
				flex={"3"}
			>
				<Flex flex="0.7" flexDir={"column"}>
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						{formatDateOnlyDayMonthYear(props?.dataInvest)}
					</Text>
					<Text fontSize={"0.875rem"} fontWeight={"400"} color={"#171923"}>
						{props?.num_cotas} cotas
					</Text>
				</Flex>
				<Flex flex="0.8" flexDir={"column"}>
					<Text fontSize={"0.875rem"} color={totalInvestColor}>
						{formatCurrency(props?.total_invested)}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"#2D3748"}>
						{props?.percentageInvestment?.toFixed(2)} % do portfólio
					</Text>
				</Flex>
				<Flex flex="0.6" flexDir={"column"}>
					<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"500"}>
						{formatDateOnlyMonthYear(props?.expected_delivery_date)}
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						(previsao)
					</Text>
				</Flex>
				<Flex flex="0.9" flexDir={"column"}>
					<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"500"}>
						{props?.profitability}%
					</Text>
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
						ao ano
					</Text>
				</Flex>
			</Flex>
			<Flex
				flex="1"
				as={"a"}
				href={isAssinarContrato ? props?.url_unsigned_document : null}
				onClick={() => handleButtonClick()}
				target="_blank"
			>
				<Button
					p={"0.5rem"}
					w={"9.125rem"}
					h={"1.25rem"}
					textAlign={"center"}
					borderRadius={"2.625rem"}
					fontSize={"0.75rem"}
					bg={getStatusColorAndText(props?.status)?.bg}
					color={getStatusColorAndText(props?.status)?.color}
					fontWeight={"500"}
					_hover={{}}
				>
					{getStatusColorAndText(props?.status)?.statusText}
				</Button>
			</Flex>
			<Flex flex="1">
				<Button
					as={"a"}
					target="_blank"
					p={"0.5rem"}
					w={"8.375rem"}
					h={"1.25rem"}
					textAlign={"center"}
					borderRadius={"2.625rem"}
					fontSize={"0.75rem"}
					bg={"transparent"}
					color={"#007D99"}
					fontWeight={"500"}
					_hover={{}}
					href={isAssinarContrato ? props?.url_unsigned_document : null}
					onClick={() => handleButtonClick()}
				>
					{getStatusColorAndText(props?.status)?.action}
				</Button>
			</Flex>
		</MotionFlex>
	);
};
