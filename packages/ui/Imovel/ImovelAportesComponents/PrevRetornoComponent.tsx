import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../utils/BRCurrency";
import { formatDateOnlyDayMonthCompleteYear } from "../../../../apps/investor/utils/formatDate";
import { useTranslation } from "react-i18next";

interface IComponentProps {
	data?: unknown; //
	imovelDetails?: unknown;
	isMyInvest: boolean;
}

export const PrevRetornoComponent: React.FC<IComponentProps> = ({
	data,
	isMyInvest,
	imovelDetails,
}) => {
	const { t } = useTranslation();
	let isMozilla = false;
	if (typeof window !== "undefined") {
		isMozilla = /firefox/i.test(window.navigator.userAgent);
	}

	return (
		<Flex mb={"2rem"} flexDir={"column"}>
			{isMyInvest && (
				<Text
					color={"#171923"}
					fontWeight={"600"}
					fontSize={"1.5rem"}
					mb={"2rem"}
				>
					{t("opportunitieDetails.previsaoDeRetorno")}
				</Text>
			)}
			<Flex gap={"8.8125rem"} mb={"1.5rem"}>
				<Flex flexDir={"column"} gap={"0.25rem"}>
					<Flex gap={"0.5rem"} w={isMozilla ? "9rem" : "unset"}>
						<Text
							fontSize={"0.875rem"}
							w={"100%"}
							color={"#007D99"}
							fontWeight={"500"}
						>
							{isMyInvest
								? t("opportunitieDetails.valorEstimado")
								: t("opportunitieDetails.previsaoDeRetorno")}{" "}
						</Text>
						<Img src="/icons/info-circle-littlegray.svg" />
					</Flex>
					<Flex gap={"0.75rem"}>
						<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
							+{" "}
							{formatCurrency(
								isMyInvest
									? data?.data?.estimated_value
									: imovelDetails?.forecast_return
							)}
						</Text>
						<Text fontSize={"1.125rem"} fontWeight={"400"} color={"#38A169"}>
							{isMyInvest
								? data?.data?.expected_rentability?.toFixed(2)
								: imovelDetails?.profitability}
							%{""}
						</Text>
					</Flex>
				</Flex>
				<Flex>
					<Flex flexDir={"column"} gap={"0.25rem"}>
						<Flex gap={"0.5rem"} w={isMozilla ? "14rem" : "unset"}>
							<Text fontSize={"0.875rem"} color={"#007D99"} fontWeight={"500"}>
								{t("opportunitieDetails.dataDaPrevisao")}
							</Text>
							<Img src="/icons/info-circle-littlegray.svg" />
						</Flex>
						<Flex gap={"0.75rem"}>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								{isMyInvest
									? formatDateOnlyDayMonthCompleteYear(
											data?.data?.expected_delivery_date
									  )
									: formatDateOnlyDayMonthCompleteYear(
											data?.expected_delivery_date
									  )}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Text
				fontSize={"0.875rem"}
				color={"#171923"}
				w={isMyInvest === true ? "65% " : "80%"}
			>
				{t("opportunitieDetails.retornosSeraoReembolsados")}
			</Text>
		</Flex>
	);
};
