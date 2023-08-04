import { Flex, Text } from "@chakra-ui/react";
import React from "react";
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

const data = [
	{ name: "Item 1", value: -200000000, fill: "#E53E3E" },
	{ name: "Item 2", value: -300000000, fill: "#E53E3E" },
	{ name: "Item 3", value: 200000000, fill: "#38A169" },
	{ name: "Item 4", value: 300000000, fill: "#38A169" },
	{ name: "Item 5", value: 400000000, fill: "#38A169" },
];

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
					x={x + width / 2}
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

const PositiveAndNegativeBarChart = () => {
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
				<Flex width={"8.7rem"} justifyContent={"center"}>
					<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
						2023
					</Text>
				</Flex>
				<Flex width={"8.7rem"} justifyContent={"center"}>
					<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
						2024
					</Text>
				</Flex>
				<Flex width={"8.7rem"} justifyContent={"center"}>
					<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
						2025
					</Text>
				</Flex>
				<Flex width={"8.7rem"} justifyContent={"center"}>
					<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
						2026
					</Text>
				</Flex>
				<Flex width={"8.7rem"} justifyContent={"center"}>
					<Text textAlign={"center"} color="#171923" fontSize={"0.875rem"}>
						2027
					</Text>
				</Flex>
			</Flex>
			<BarChart width={710} height={400} data={data}>
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
				width={width}
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
