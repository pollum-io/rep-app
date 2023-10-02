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
	generalForecast: IGeneralForecast;
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

	const CustomBarLabel = (props: ICustomBarLabel) => {
		const { x, y, width, value, index } = props;

		return (
			<>
				{x && y && width && value && (
					<text
						x={58}
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

	const CustomBar = (props: ICustomBarLabel) => {
		const { fill, y, height, value, index } = props;
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
				w={"max"}
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
