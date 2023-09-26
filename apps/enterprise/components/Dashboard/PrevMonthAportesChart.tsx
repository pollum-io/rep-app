import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { BarChart, Bar, LabelList, Rectangle, Cell } from "recharts";

const monthsData = [
	{ month: "Jan" },
	{ month: "Feb" },
	{ month: "Mar" },
	{ month: "Apr" },
	{ month: "May" },
	{ month: "Jun" },
	{ month: "Jul" },
	{ month: "Aug" },
	{ month: "Sep" },
	{ month: "Oct" },
	{ month: "Nov" },
	{ month: "Dec" },
];

interface ICustomBarLabelProps {
	x?: number;
	y?: number;
	width?: number;
	value?: number;
}

interface IPrevMonthAportesChart {
	monthlyForecast?: any;
}

interface IScheduleItem {
	period?: number;
	cost: number;
	total_revenue: number;
	total_revenue_percentage: number;
	units_sold: number;
	cash_flow: number;
}

export const PrevMonthAportesChart: FunctionComponent<
	IPrevMonthAportesChart
> = ({ monthlyForecast }) => {
	const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

	const monthlyData = Object.entries(monthlyForecast).map(([year, value]) => ({
		month: year,
		value: value,
	}));

	const formatCurrencyValue = (value: number) => {
		return (value / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	const CustomBarLabel = (props: ICustomBarLabelProps) => {
		const { x, y, width, value } = props;
		const isPositive = (value ? value : 0) >= 0;

		return (
			<>
				{x && y && width && value && (
					<text
						x={x + width / 1.9}
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
	const chartData = monthlyData.map((item, index) => ({
		name: `Item ${index + 1}`,
		value: item.value,
		fill: "#4BA3B7",
	}));

	const CustomBar = (props: any) => {
		const { fill, x, y, width, height, value, index } = props;
		const borderRadius = 8; // Adjust the border radius as needed
		const isPositive = (value ? value : 0) >= 0;

		return (
			<g>
				<Rectangle
					x={x}
					y={y}
					width={80}
					height={height}
					radius={
						isPositive
							? [borderRadius, borderRadius, 0, 0]
							: [borderRadius, borderRadius, 0, 0]
					}
					fill={fill}
					onMouseEnter={() => setHighlightedCell(index)}
					onMouseLeave={() => setHighlightedCell(null)}
					style={{
						filter:
							highlightedCell === index
								? `drop-shadow(0px 0px 4px #1000005a)`
								: "null",
					}}
				/>
			</g>
		);
	};

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
				{monthsData.map((data, index) => (
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
				<Bar radius={[8, 8, 0, 0]} dataKey="value" shape={<CustomBar />}>
					<LabelList dataKey="value" content={<CustomBarLabel />} />
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
				</Bar>
			</BarChart>
		</Flex>
	);
};
