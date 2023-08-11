import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { Box, Flex, Text } from "@chakra-ui/react";

interface IActiveShapeProps {
	index: number;
	cx: number;
	cy: number;
	innerRadius: number;
	outerRadius: number;
	startAngle: number;
	endAngle: number;
	fill: string;
}

interface ICustomizedLabelProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
}

export const PrevisaoDeCaixaChart: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
	const onMouseOver = useCallback((data: unknown, index: number) => {
		setActiveIndex(index);
	}, []);
	const onMouseLeave = useCallback((data: unknown, index: number) => {
		setActiveIndex(undefined);
	}, []);

	const RADIAN = Math.PI / 180;
	const COLORS = ["#2321C0", "#BCA1FF", "#1BA9EA", "#6E40E7"];

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
	}: ICustomizedLabelProps) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={"middle"}
				dominantBaseline="central"
				style={{ transition: "all 0.5s ease-in-out" }}
			>
				{`${(percent * 100).toFixed(2)}%`}
			</text>
		);
	};

	const renderActiveShape = (props: IActiveShapeProps) => {
		const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
			props;

		return (
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius + 5}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
		);
	};

	// Valores mockados para o gráfico
	const pieChartData = [
		{ name: "Tipo 1", value: 0.3 },
		{ name: "Tipo 2", value: 0.2 },
		{ name: "Tipo 3", value: 0.4 },
		{ name: "Tipo 4", value: 0.1 },
	];

	return (
		<Flex alignItems={"center"}>
			<Box>
				<PieChart width={270} height={280}>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={pieChartData}
						cx={120}
						cy={140}
						innerRadius={60}
						outerRadius={120}
						fill="#8884d8"
						paddingAngle={0}
						dataKey="value"
						nameKey="name"
						onMouseOver={onMouseOver}
						onMouseLeave={onMouseLeave}
						label={renderCustomizedLabel}
						labelLine={false}
						className="recharts-pie-sector-active"
						stroke="none"
					>
						{pieChartData.map((entry, index) => (
							<Cell
								style={{ outline: "none" }}
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
				</PieChart>
			</Box>
			<Box ml="1rem">
				<Flex flexDir="row" gap={"2.6rem"}>
					{pieChartData.map((entry, index) => (
						<Box key={`label-${index}`} mt="10px">
							<Text
								color={COLORS[index % COLORS.length]}
								fontSize={"0.75rem"}
								fontWeight={"500"}
							>
								Fase {index + 1}
							</Text>
							<Text color={"#171923"} fontSize={"1rem"} fontWeight={"500"}>{`${(
								entry.value * 100
							).toFixed(2)}%`}</Text>
							<Text fontSize={"0.75rem"} fontWeight={"500"}>
								{index === 0
									? "Banco"
									: index === 1
									? "LIVN"
									: index === 2
									? "Investidores X"
									: "Investidores Y"}
							</Text>
						</Box>
					))}
				</Flex>
			</Box>
		</Flex>
	);
};
