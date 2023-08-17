import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	LabelList,
	Rectangle,
} from "recharts";

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

interface IPositiveAndNegativeBarChart {
	data?: IScheduleItem[];
}

const formatCurrencyValue = (value: number) => {
	return (value / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

const getBarColor = (entryValue: string | number) => {
	return Number(entryValue) >= 0 ? "#38A169" : "#E53E3E";
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

const PositiveAndNegativeBarChart: FunctionComponent<
	IPositiveAndNegativeBarChart
> = ({ data }) => {
	const chartData = data?.map((item, index) => ({
		name: `Item ${index + 1}`,
		value: item.cash_flow,
		fill: getBarColor(item.cash_flow),
	}));

	return (
		<Flex flexDir={"column"}>
			<Flex
				px={"0.4rem"}
				boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);"
				w={"44.125rem"}
				borderRadius={"0.75rem"}
				py={"1rem"}
				mb={"2rem"}
			>
				{data?.map((data, index) => (
					<Flex key={index} width={"8.2rem"} justifyContent={"center"}>
						<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
							{data?.period}
						</Text>
					</Flex>
				))}
			</Flex>
			<BarChart width={280} height={400} data={chartData}>
				<XAxis hide={true} />
				<YAxis hide={true} />
				<Tooltip
					formatter={(value) => formatCurrencyValue(Number(value))} // Format tooltip value
				/>
				<Bar dataKey="value" fill={String(getBarColor)} shape={<CustomBar />}>
					<LabelList dataKey="value" content={<CustomBarLabel />} />
				</Bar>
			</BarChart>
		</Flex>
	);
};

const CustomBar = (props: ICustomBarProps) => {
	const { fill, x, y, width, height, value } = props;
	const borderRadius = 8; // Adjust the border radius as needed
	const isPositive = (value ? value : 0) >= 0;

	return (
		<g>
			<Rectangle
				x={x}
				y={y}
				width={105}
				height={height}
				radius={
					isPositive
						? [borderRadius, borderRadius, 0, 0]
						: [borderRadius, borderRadius, 0, 0]
				}
				fill={fill}
			/>
		</g>
	);
};

export default PositiveAndNegativeBarChart;
