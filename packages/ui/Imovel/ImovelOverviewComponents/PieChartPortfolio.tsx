import { Flex, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { IOpportunitiesCard } from "../dtos/Oportunities";

interface IPieChart {
	data?: any;
	opData?: IOpportunitiesCard;
}

export const PieChartComponent: React.FC<IPieChart> = (props) => {
	const { data, opData } = props;
	const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

	const onMouseOver = useCallback((_: unknown, index: number) => {
		setActiveIndex(index);
	}, []);

	const onMouseLeave = useCallback(() => {
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
		index,
	}: any) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		const formattedPercent =
			percent === 1 ? "100%" : `${(percent * 100).toFixed(2)}%`;

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={"middle"}
				dominantBaseline="central"
				style={{ transition: "all 0.5s ease-in-out" }}
				onMouseOver={() => onMouseOver(undefined, index)}
				onMouseLeave={() => onMouseLeave()}
			>
				{formattedPercent}
			</text>
		);
	};

	const renderActiveShape = (props: any) => {
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
				className="recharts-pie-sector-active"
			/>
		);
	};

	const countEnterpriseTypes = (data: any) => {
		const typesCount: any = {};
		data.forEach((item: any) => {
			const type = item.enterprise_type;
			typesCount[type] = (typesCount[type] || 0) + 1;
		});
		const totalCount: any = Object.values(typesCount).reduce(
			(a: any, b: any) => a + b,
			0
		);
		return Object.entries(typesCount).map(([type, count]: any) => ({
			name: type,
			value: count / totalCount,
		}));
	};

	const countOpportunityTypes = (opData: any) => {
		const typesCount: any = {};
		opData.business_details.description_flows_raised.forEach((item: any) => {
			const type = item.item;
			typesCount[type] = (typesCount[type] || 0) + item.value;
		});
		const totalCount: any = Object.values(typesCount).reduce(
			(a: any, b: any) => a + b,
			0
		);
		return Object.entries(typesCount).map(([type, count]: any) => ({
			name: type,
			value: count / totalCount,
		}));
	};

	const pieChartData = opData
		? countOpportunityTypes(opData)
		: countEnterpriseTypes(data);

	return (
		<Flex alignItems={"center"}>
			<Flex>
				<PieChart width={280} height={290}>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={pieChartData}
						cx={120}
						cy={150}
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
						{pieChartData.map((entry: any, index: any) => (
							<Cell
								style={{ outline: "none" }}
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
				</PieChart>
			</Flex>
			<Flex ml="1rem">
				<Flex flexDir="row" gap={"2rem"}>
					{pieChartData.map((entry, index) => (
						<Flex key={`label-${index}`} mt="10px" flexDir="column">
							<Text
								color={COLORS[index % COLORS.length]}
								fontSize="1rem"
								fontWeight="500"
							>
								{entry.value === 1
									? "100%"
									: `${(entry.value * 100).toFixed(2)}%`}
							</Text>
							<Text fontSize="0.75rem" color="#2D3748" fontWeight="400">
								{entry.name}
							</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};
