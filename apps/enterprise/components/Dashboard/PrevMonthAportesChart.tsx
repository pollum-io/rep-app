import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { BarChart, Bar, LabelList, Rectangle, Cell, YAxis } from "recharts";
import { IMonthlyForecast } from "../../types/IMonthlyForecast";

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
	index?: number;
	fill?: string;
	height?: number;
}

interface IPrevMonthAportesChart {
	monthlyForecast?: IMonthlyForecast;
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
		if (value > 999999.99) {
			const valueInMillion = (value / 1000000).toFixed(1);

			return `${valueInMillion}M`;
		}

		if (value > 999.99) {
			const valueInThousand = (value / 1000).toFixed(1);

			return `${valueInThousand}K`;
		}

		return (value / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	console.log(monthlyForecast, "monthlyForecast");
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
	// const chartData = monthlyData.map((item, index) => ({
	// 	name: `Item ${index + 1}`,
	// 	value: item.value,
	// 	fill: "#4BA3B7",
	// }));

	const filteredChartData = [
		{
			name: 1,
			value: 10000000,
			fill: "#4BA3B7",
		},
		{
			name: 2,
			value: 100000,
			fill: "#4BA3B7",
		},
		{
			name: 3,
			value: 1000000,
			fill: "#4BA3B7",
		},
		{
			name: 4,
			value: 8000000,
			fill: "#4BA3B7",
		},
		{
			name: 5,
			value: 8000000,
			fill: "#4BA3B7",
		},
		{
			name: 6,
			value: 8000000,
			fill: "#4BA3B7",
		},
		{
			name: 7,
			value: 6000000,
			fill: "#4BA3B7",
		},
		{
			name: 8,
			value: 5000000,
			fill: "#4BA3B7",
		},
		{
			name: 9,
			value: 2500000,
			fill: "#4BA3B7",
		},
		{
			name: 10,
			value: 2000000,
			fill: "#4BA3B7",
		},
		{
			name: 11,
			value: 10000000,
			fill: "#4BA3B7",
		},
		{
			name: 12,
			value: 10000000,
			fill: "#4BA3B7",
		},
	];

	const chartData = filteredChartData.map((item, index) => ({
		name: index + 1,
		logValue: Math.log(item.value), // Aplicando o logaritmo aos valores
		originalValue: item.value, // Mantendo o valor original para exibição
		fill: "#4BA3B7",
	}));

	const CustomBar = (props: ICustomBarLabelProps) => {
		const { fill, x, y, height, value, index } = props;
		const borderRadius = 8; // Adjust the border radius as needed
		const isPositive = (value ? value : 0) >= 0;

		return (
			<g>
				<Rectangle
					x={x}
					y={y}
					width={80}
					height={500}
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
				<Bar
					radius={[8, 8, 0, 0]}
					dataKey="logValue" // Usando o valor transformado pelo logaritmo
					shape={<CustomBar />}
					isAnimationActive={false}
				>
					<LabelList
						dataKey="originalValue" // Usando o valor original para exibição
						content={<CustomBarLabel />}
					/>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
				</Bar>
			</BarChart>
		</Flex>
	);
};
