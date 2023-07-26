import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const data = [
	{ name: "Item 1", value: -200000000, fill: "#E53E3E" },
	{ name: "Item 2", value: -300000000, fill: "#E53E3E" },
	{ name: "Item 3", value: 200000000, fill: "#38A169" },
	{ name: "Item 4", value: 300000000, fill: "#38A169" },
	{ name: "Item 5", value: 400000000, fill: "#38A169" },
];

const formatCurrencyValue = (value) => {
	return (value / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
};

const getBarColor = (entryValue: string) => {
	return Number(entryValue) >= 0 ? "#38A169" : "#E53E3E";
};

const PositiveAndNegativeBarChart = () => {
	return (
		<Flex flexDir={"column"}>
			<Flex
				p={"1rem"}
				boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);"
				w={"44.125rem"}
			>
				<Text
					textAlign={"center"}
					flex={"1"}
					color="#171923"
					fontSize={"0.875rem"}
				>
					2023
				</Text>
				<Text
					textAlign={"center"}
					flex={"1"}
					color="#171923"
					fontSize={"0.875rem"}
				>
					2024
				</Text>
				<Text
					textAlign={"center"}
					flex={"1"}
					color="#171923"
					fontSize={"0.875rem"}
				>
					2025
				</Text>
				<Text
					textAlign={"center"}
					flex={"1.4"}
					color="#171923"
					fontSize={"0.875rem"}
				>
					2026
				</Text>
				<Text
					textAlign={"center"}
					flex={"0.7"}
					color="#171923"
					fontSize={"0.875rem"}
				>
					2027
				</Text>
			</Flex>
			<BarChart width={710} height={400} data={data}>
				<XAxis hide={true} />
				<YAxis hide={true} />
				<Tooltip
					formatter={(value) => formatCurrencyValue(value)} // Format tooltip value
				/>
				<Bar
					dataKey="value"
					fill={String(getBarColor)} // Use the getBarColor function
					label={{
						position: "inside",
						fill: "white",
						fontSize: "12px",
						formatter: (value) => formatCurrencyValue(value), // Format label value
					}}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
				</Bar>
			</BarChart>
		</Flex>
	);
};

export default PositiveAndNegativeBarChart;
