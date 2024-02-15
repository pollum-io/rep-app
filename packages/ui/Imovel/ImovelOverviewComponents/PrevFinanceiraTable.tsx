import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import {
	formatCurrency,
	formatCurrencyWithoutSymbol,
} from "../../utils/BRCurrency";
import { useTranslation } from "react-i18next";

interface IScheduleItem {
	period?: number;
	cost: number;
	total_revenue: number;
	total_revenue_percentage: number;
	units_sold: number;
	cash_flow: number;
}

interface IPrevFinanceira {
	data?: IScheduleItem[];
}

const dataFin = [
	{
		period: 2024,
		cost: 82587965.23,
		total_revenue: 75781249.95,
		total_revenue_percentage: 15.63,
		units_sold: 15,
		cash_flow: -6806715.28,
	},
	{
		period: 2025,
		cost: 196745896.58,
		total_revenue: 176822916.55,
		total_revenue_percentage: 36.46,
		units_sold: 35,
		cash_flow: -19922980.03,
	},
	{
		period: 2026,
		cost: 148742369.87,
		total_revenue: 202083333.2,
		total_revenue_percentage: 41.67,
		units_sold: 40,
		cash_flow: 53340963.33,
	},
];

const PrevFinanceiraTable: FunctionComponent<IPrevFinanceira> = ({ data }) => {
	const [totalData, setTotalData] = useState<IScheduleItem | null>(dataFin);
	const { t } = useTranslation();

	useEffect(() => {
		const calculateTotal = (data: IScheduleItem[]) => {
			const initialTotal = {
				cost: 0,
				total_revenue: 0,
				total_revenue_percentage: 0,
				units_sold: 0,
				cash_flow: 0,
			};

			return data.reduce((total, item) => {
				total.cost += item.cost;
				total.total_revenue += item.total_revenue;
				total.total_revenue_percentage += item.total_revenue_percentage;
				total.units_sold += item.units_sold;
				total.cash_flow += item.cash_flow;

				return total;
			}, initialTotal);
		};

		if (data) {
			const calculatedTotal = calculateTotal(dataFin);
			setTotalData(calculatedTotal);
		}
	}, [data]);

	const renderRows = () => {
		return dataFin?.map((item: IScheduleItem, index: number) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.75rem"}
			>
				<Flex flex="0.6" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#003243c8"}>
						{item?.period}
					</Text>
				</Flex>
				<Flex flex="1.1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{formatCurrencyWithoutSymbol(item?.cost)}
					</Text>
				</Flex>
				<Flex flex="1.1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{formatCurrencyWithoutSymbol(item.total_revenue)}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.total_revenue_percentage}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{item.units_sold}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={"400"}
						color={item.cash_flow > 0 ? "#38A169" : "#E53E3E"}
					>
						{item.cash_flow > 0
							? `+ ${formatCurrencyWithoutSymbol(item.cash_flow)}`
							: `- ${formatCurrencyWithoutSymbol(item.cash_flow)}`}
					</Text>
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex
			border={"1px solid #E2E8F0"}
			flexDir={"column"}
			w={"46.125rem"}
			borderRadius="0.75rem"
		>
			<Flex
				id="table-header"
				bg={"#003243c8"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderTopRadius="0.75rem"
			>
				<Flex flex="0.6">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.periodo")}
					</Text>
				</Flex>
				<Flex flex="1.1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.custo")}
					</Text>
				</Flex>
				<Flex flex="1.1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.receitaTotal")}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.receitaTotal")}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.unVendidas")}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.fluxoCaixa")}
					</Text>
				</Flex>
			</Flex>
			{renderRows()}
			<Flex
				id="table-header"
				bg={"#003243c8"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderBottomRadius="0.75rem"
			>
				<Flex flex="0.6">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{t("opportunitieDetails.total")}
					</Text>
				</Flex>
				<Flex flex="1.1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{formatCurrency(totalData?.cost)}{" "}
					</Text>
				</Flex>
				<Flex flex="1.1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{formatCurrency(totalData?.total_revenue)}{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{totalData?.total_revenue_percentage} %
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{totalData?.units_sold}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{formatCurrency(totalData?.cash_flow)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PrevFinanceiraTable;
