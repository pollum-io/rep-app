import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { BarChart, Bar, LabelList, Rectangle, Cell } from "recharts";

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
];
const mockDataa = [
	{
		year: 2023,
		value: 500,
	},
	{
		year: 2024,
		value: -300,
	},
	{
		year: 2025,
		value: 700,
	},
	{
		year: 2026,
		value: -400,
	},
	{
		year: 2027,
		value: 600,
	},
	{
		year: 2028,
		value: 800,
	},
	{
		year: 2029,
		value: -200,
	},
	{
		year: 2030,
		value: 900,
	},
];

interface IScheduleItem {
	period?: number;
	cost: number;
	total_revenue: number;
	total_revenue_percentage: number;
	units_sold: number;
	cash_flow: number;
}

interface IPrevAportes {
	generalForecast: any;
}

export const PrevAportesChart: FunctionComponent<IPrevAportes> = ({
	generalForecast,
}) => {
	const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

	const yearlyData = Object.entries(generalForecast.yearlyData).map(
		([year, value]) => ({
			name: year,
			value: value,
		})
	);

	const formatCurrencyValue = (value: number) => {
		return (value / 1).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	const CustomBarLabel = (props: any) => {
		const { x, y, width, value, index } = props;
		const centerX = x + width / 8;

		return (
			<>
				{x && y && width && value && (
					<text
						x={64}
						y={y + 20}
						fill="white"
						fontSize={12}
						fontWeight={500}
						textAnchor="top"
						style={{ transition: "all 0.5s ease-in-out", zIndex: 9999999 }}
						onMouseEnter={() => setHighlightedCell(index)}
						onMouseLeave={() => setHighlightedCell(null)}
					>
						{formatCurrencyValue(value)}
					</text>
				)}
			</>
		);
	};

	const chartData = yearlyData.map((item, index) => ({
		name: `Item ${index + 1}`,
		value: item.value,
		fill: "#48BB78",
	}));

	const CustomBar = (props: any) => {
		const { fill, x, y, width, height, value, index } = props;
		const borderRadius = 8; // Adjust the border radius as needed
		const isPositive = (value ? value : 0) >= 0;

		return (
			<g>
				<Rectangle
					x={48}
					y={y}
					width={105}
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
				{yearlyData.map((data, index) => (
					<Flex
						key={index}
						width={"10.6rem"}
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
							{data.name}
						</Text>
					</Flex>
				))}
			</Flex>
			<BarChart width={1104} height={90} data={chartData}>
				<Bar radius={[8, 8, 0, 0]} dataKey="value" shape={<CustomBar />}>
					<LabelList dataKey="value" content={<CustomBarLabel />} />
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}{" "}
				</Bar>
			</BarChart>
		</Flex>
	);
};
