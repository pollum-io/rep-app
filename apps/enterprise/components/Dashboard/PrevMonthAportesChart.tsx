import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	LabelList,
	Rectangle,
	ResponsiveContainer,
	Cell,
} from "recharts";
const mockData: IScheduleItem[] = [
	{
		period: 1,
		cost: 1000,
		total_revenue: 1500,
		total_revenue_percentage: 50,
		units_sold: 200,
		cash_flow: 500,
	},
	{
		period: 2,
		cost: 1200,
		total_revenue: 1800,
		total_revenue_percentage: 60,
		units_sold: 250,
		cash_flow: 600,
	},
	{
		period: 3,
		cost: 900,
		total_revenue: 1350,
		total_revenue_percentage: 45,
		units_sold: 180,
		cash_flow: 450,
	},
	{
		period: 4,
		cost: 1100,
		total_revenue: 1600,
		total_revenue_percentage: 55,
		units_sold: 220,
		cash_flow: 500,
	},
	{
		period: 5,
		cost: 1300,
		total_revenue: 1700,
		total_revenue_percentage: 52,
		units_sold: 240,
		cash_flow: 400,
	},
	{
		period: 6,
		cost: 950,
		total_revenue: 1400,
		total_revenue_percentage: 47,
		units_sold: 190,
		cash_flow: 450,
	},
	{
		period: 7,
		cost: 1050,
		total_revenue: 1550,
		total_revenue_percentage: 53,
		units_sold: 210,
		cash_flow: 500,
	},
	{
		period: 8,
		cost: 1150,
		total_revenue: 1650,
		total_revenue_percentage: 57,
		units_sold: 230,
		cash_flow: 500,
	},
	{
		period: 9,
		cost: 1150,
		total_revenue: 1650,
		total_revenue_percentage: 57,
		units_sold: 230,
		cash_flow: 500,
	},
	{
		period: 10,
		cost: 1150,
		total_revenue: 1650,
		total_revenue_percentage: 57,
		units_sold: 230,
		cash_flow: 500,
	},
	{
		period: 11,
		cost: 1150,
		total_revenue: 1650,
		total_revenue_percentage: 57,
		units_sold: 230,
		cash_flow: 500,
	},
	{
		period: 12,
		cost: 1150,
		total_revenue: 1650,
		total_revenue_percentage: 57,
		units_sold: 230,
		cash_flow: 500,
	},
];
const mockDataa = [
	{ month: "Jan", value: 500 },
	{ month: "Feb", value: -300 },
	{ month: "Mar", value: 700 },
	{ month: "Apr", value: -400 },
	{ month: "May", value: 600 },
	{ month: "Jun", value: 800 },
	{ month: "Jul", value: -200 },
	{ month: "Aug", value: 900 },
	{ month: "Sep", value: 0 }, // Adicione os meses restantes com valores fictícios
	{ month: "Oct", value: 0 },
	{ month: "Nov", value: 0 },
	{ month: "Dec", value: 0 },
];

interface ICustomBarLabelProps {
	x?: number;
	y?: number;
	width?: number;
	value?: number;
}

interface ICustomBarProps {
	fill?: string;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	value?: number;
}

interface IScheduleItem {
	period?: number;
	cost: number;
	total_revenue: number;
	total_revenue_percentage: number;
	units_sold: number;
	cash_flow: number;
}

const formatCurrencyValue = (value: number) => {
	return (value / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

const getBarColor = (entryValue: string | number) => {
	return Number(entryValue) >= 0 ? "#4BA3B7" : "#E53E3E";
};

const CustomBarLabel = (props: ICustomBarLabelProps) => {
	const { x, y, width, value } = props;
	const isPositive = (value ? value : 0) >= 0;

	return (
		<>
			{x && y && width && value && (
				<text
					x={x + width / 2.2}
					y={isPositive ? y - -18 : y + -13}
					fill="white"
					fontSize={12}
					textAnchor="middle"
				>
					{formatCurrencyValue(value)}
				</text>
			)}
		</>
	);
};

const PrevMonthAportesChart: FunctionComponent = () => {
	const chartData = mockData.map((item, index) => ({
		name: `Item ${index + 1}`,
		value: item.cash_flow,
		fill: getBarColor(item.cash_flow),
	}));
	const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

	return (
		<Flex flexDir={"column"} w={"100%"}>
			<Flex
				boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);"
				w={"70rem"}
				borderRadius={"0.75rem"}
				py={"1rem"}
				px={"0.8rem"}
				mb={"2rem"}
			>
				{mockDataa.map((data, index) => (
					<Flex
						key={index}
						width={"14.4581rem"}
						justifyContent={"center"}
						gap={"1.5rem"}
					>
						<Text
							textAlign={"center"}
							color="#171923"
							fontSize={"0.875rem"}
							onMouseEnter={() => setHighlightedCell(index)}
							onMouseLeave={() => setHighlightedCell(null)}
							fontWeight={highlightedCell === index ? "500" : "400"}
						>
							{data.month}
						</Text>
					</Flex>
				))}
			</Flex>
			<BarChart width={1114} height={290} data={chartData}>
				<Bar radius={[8, 8, 0, 0]} dataKey="value">
					{chartData.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={entry.fill}
							width={65}
							onMouseEnter={() => setHighlightedCell(index)}
							onMouseLeave={() => setHighlightedCell(null)}
							style={{
								filter:
									highlightedCell === index
										? `drop-shadow(0px 0px 4px #1000005a)`
										: "null",
							}}
						/>
					))}
				</Bar>
			</BarChart>
		</Flex>
	);
};

export default PrevMonthAportesChart;
