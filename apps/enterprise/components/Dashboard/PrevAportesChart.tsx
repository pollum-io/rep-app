import { Flex, Text } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { BarChart, Bar, LabelList, Rectangle, Cell } from "recharts";
import { IGeneralForecast } from "../../types/IGeneralForecast";

interface ICustomBarLabel {
	x?: number;
	y?: number;
	width?: number;
	value?: number;
	index?: number;
	fill?: string;
	height?: number;
}

interface IPrevAportes {
	generalForecast?: IGeneralForecast;
	opForecast?: YearlyData;
	isOpportunityPage?: boolean;
}

type YearlyData = {
	[year: number]: number;
};

export const PrevAportesChart: FunctionComponent<IPrevAportes> = ({}) => {
	const [highlightedCell, setHighlightedCell] = useState<number | null>(null);

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

	const CustomBarLabel = (props: ICustomBarLabel) => {
		const { x, y, width, value, index } = props;

		return (
			<>
				{x && y && width && value && (
					<text
						x={x + width / 2}
						y={y + 20}
						fill="white"
						fontSize={12}
						fontWeight={500}
						textAnchor="top"
						style={{ transition: "all 0.5s ease-in-out", zIndex: 9999999 }}
						onMouseEnter={() => setHighlightedCell(Number(index))}
						onMouseLeave={() => setHighlightedCell(null)}
					>
						{formatCurrencyValue(value)}
					</text>
				)}
			</>
		);
	};

	const filteredChartData = [
		{
			name: 1,
			value: 63500000,
			fill: "#48BB78",
		},
		{
			name: 2,
			value: 73500000,
			fill: "#48BB78",
		},
		{
			name: 3,
			value: 79500000,
			fill: "#48BB78",
		},
		{
			name: 4,
			value: 81500000,
			fill: "#48BB78",
		},
		{
			name: 5,
			value: 85500000,
			fill: "#48BB78",
		},
		{
			name: 6,
			value: 89900000,
			fill: "#48BB78",
		},
		{
			name: 7,
			value: 98100000,
			fill: "#48BB78",
		},
	];

	const chartData = filteredChartData.map((item, index) => ({
		name: index + 1,
		logValue: Math.log(item.value), // Aplicando o logaritmo aos valores
		originalValue: item.value, // Mantendo o valor original para exibição
		fill: "#48BB78",
	}));

	const CustomBar = (props: ICustomBarLabel) => {
		const { fill, x, y, width, value, index } = props;
		const borderRadius = 8; // Adjust the border radius as needed
		const isPositive = (value ? value : 0) >= 0;

		if (width === undefined || x === undefined) {
			return null;
		}

		return (
			<g>
				<Rectangle
					x={x + width / 4.5}
					y={y}
					width={105}
					height={10000}
					radius={
						isPositive
							? [borderRadius, borderRadius, 0, 0]
							: [borderRadius, borderRadius, 0, 0]
					}
					fill={fill}
					onMouseEnter={() => setHighlightedCell(Number(index))}
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
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2024
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2025
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2026
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2027
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2028
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2029
					</Text>
				</Flex>
				<Flex width={"100%"} justifyContent={"center"} gap={"1.5rem"}>
					<Text
						textAlign={"center"}
						color="#171923"
						fontSize={"0.875rem"}
						onMouseLeave={() => setHighlightedCell(null)}
						fontWeight={"400"}
					>
						2030
					</Text>
				</Flex>
			</Flex>
			<BarChart width={1090} height={300} data={chartData}>
				<Bar
					radius={[8, 8, 0, 0]}
					dataKey="logValue"
					shape={<CustomBar />}
					isAnimationActive={false}
				>
					<LabelList dataKey="originalValue" content={<CustomBarLabel />} />
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}{" "}
				</Bar>
			</BarChart>
		</Flex>
	);
};
