import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	LabelList,
	Rectangle,
	Cell,
} from "recharts";
import { formatCurrency } from "../../utils";

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

const PositiveAndNegativeBarChart: FunctionComponent<
	IPositiveAndNegativeBarChart
> = ({ data }) => {
	const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

	const formatCurrencyValue = (value: number) => {
		return (value / 10).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	const getBarColor = (entryValue: string | number) => {
		return Number(entryValue) >= 0 ? "#003243c8" : "#ca5d5d";
	};

	const CustomBarLabel = (props: unknown) => {
		const { x, y, width, value, index } = props;
		const isPositive = (value ? value : 0) >= 0;
		const yPosition = isPositive ? y - -18 : y + -12;

		return (
			<>
				{x && y && width && value && (
					<text
						x={x + width / 2.4}
						y={yPosition}
						fill="white"
						fontSize={12}
						textAnchor="middle"
						style={{ transition: "all 0.5s ease-in-out" }}
						onMouseEnter={() => setHighlightedCell(index)}
						onMouseLeave={() => setHighlightedCell(null)}
					>
						{formatCurrency(value)}
					</text>
				)}
			</>
		);
	};

	const chartData = data?.map((item, index) => ({
		name: `Item ${index + 1}`,
		value: item.cash_flow,
		fill: getBarColor(item.cash_flow),
	}));

	const CustomBar = (props: unknown) => {
		const { fill, x, y, width, height, value, index } = props;
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
					<Flex key={index} width={"9.2rem"} justifyContent={"center"}>
						<Text
							textAlign={"center"}
							color="#171923"
							fontSize={"0.875rem"}
							fontWeight={highlightedCell === index ? "500" : "400"}
						>
							{data?.period}
						</Text>
					</Flex>
				))}
			</Flex>
			<BarChart width={610} height={220} data={chartData}>
				<XAxis hide={true} />
				<YAxis hide={true} />
				<Bar
					radius={[8, 8, 0, 0]}
					dataKey="value"
					minPointSize={50}
					shape={<CustomBar />}
				>
					{chartData?.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
					<LabelList dataKey="value" content={<CustomBarLabel />} />
				</Bar>
			</BarChart>
		</Flex>
	);
};

export default PositiveAndNegativeBarChart;
