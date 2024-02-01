import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import {
	formatCurrency,
	formatCurrencyWithoutSymbol,
} from "../../utils/BRCurrency";

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

const PrevFinanceiraTable: FunctionComponent<IPrevFinanceira> = ({ data }) => {
	const [totalData, setTotalData] = useState<IScheduleItem | null>(null);

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
				total.cost += parseFloat(
					item.cost
						.toString()
						.replace("R$", "")
						.replace(".", "")
						.replace(",", "")
				);
				total.total_revenue += parseFloat(
					item.total_revenue
						.toString()
						.replace("R$", "")
						.replace(".", "")
						.replace(",", "")
				);
				total.total_revenue_percentage += parseFloat(
					item.total_revenue_percentage
						.toString()
						.replace(" %", "")
						.replace(",", "")
				);
				total.units_sold += item.units_sold;
				total.cash_flow += parseFloat(
					item.cash_flow
						.toString()
						.replace("R$", "")
						.replace(".", "")
						.replace(",", "")
				);

				return total;
			}, initialTotal);
		};

		if (data) {
			const calculatedTotal = calculateTotal(data);
			setTotalData(calculatedTotal);
		}
	}, [data]);

	const renderRows = () => {
		return data?.map((item: IScheduleItem, index: number) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.75rem"}
			>
				<Flex flex="0.7" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#003243c8"}>
						{item?.period}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{formatCurrencyWithoutSymbol(item?.cost)}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
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
			w={"44.125rem"}
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
				<Flex flex="0.7">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Período{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Custo
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Recita Total
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Receita total{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Un. vendidas{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"500"} color={"white"}>
						Fluxo de caixa{" "}
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
				<Flex flex="0.7">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						Total{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{formatCurrencyWithoutSymbol(totalData?.cost)}{" "}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"600"} color={"white"}>
						{formatCurrencyWithoutSymbol(totalData?.total_revenue)}{" "}
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
