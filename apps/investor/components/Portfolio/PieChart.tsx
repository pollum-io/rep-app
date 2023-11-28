import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

interface PieChartDataItem {
	name: string;
	value: number;
}

interface IPieChart {
	data?: PieChartDataItem[];
}

export const PieChartCom: React.FC<IPieChart> = (props) => {
	const { data } = props;
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const onPieEnter = useCallback(
		(_: number, index: number) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);
	const RADIAN: number = Math.PI / 180;
	const COLORS: string[] = ["#2321C0", "#BCA1FF", "#1BA9EA", "#6E40E7"];

	// Conta as instâncias de cada tipo de empresa
	// const countByType: Record<string, number> | undefined = data?.reduce(
	// 	(counts: Record<string, number>, item: PieChartDataItem) => {
	// 		const type = item.name;
	// 		if (type in counts) {
	// 			counts[type]++;
	// 		} else {
	// 			counts[type] = 1;
	// 		}
	// 		return counts;
	// 	},
	// 	{}
	// );

	// // Calcula as porcentagens de cada tipo de empresa
	// const total: number = Object?.values(countByType).reduce(
	// 	(sum: number, count: number) => sum + count,
	// 	0
	// );
	// const percentages: { enterprise_type: string; percentage: number }[] =
	// 	Object.entries(countByType).map(([type, count]: [string, number]) => ({
	// 		enterprise_type: type,
	// 		percentage: (count / total) * 100,
	// 	}));

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
	}: {
		cx: number;
		cy: number;
		midAngle: number;
		innerRadius: number;
		outerRadius: number;
		percent: number;
		index: number;
	}) => {
		const radius: number = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x: number = cx + radius * Math.cos(-midAngle * RADIAN);
		const y: number = cy + radius * Math.sin(-midAngle * RADIAN);

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

	// const renderActiveShape = (
	// 	cx: number,
	// 	cy: number,
	// 	innerRadius: number,
	// 	outerRadius: number,
	// 	startAngle: number,
	// 	endAngle: number,
	// 	fill: string
	// ) => {
	// 	return (
	// 		<Sector
	// 			cx={cx}
	// 			cy={cy}
	// 			innerRadius={innerRadius}
	// 			outerRadius={outerRadius + 5}
	// 			startAngle={startAngle}
	// 			endAngle={endAngle}
	// 			fill={fill}
	// 			className="recharts-pie-sector-active"
	// 		/>
	// 	);
	// };

	const countEnterpriseTypes = (data: PieChartDataItem[]) => {
		const typesCount: Record<string, number> = {};
		data.forEach((item: PieChartDataItem) => {
			const type = item.name;
			typesCount[type] = (typesCount[type] || 0) + 1;
		});
		const totalCount: number = Object.values(typesCount).reduce(
			(a: number, b: number) => a + b,
			0
		);
		return Object.entries(typesCount).map(
			([type, count]: [string, number]) => ({
				name: type,
				value: count / totalCount,
			})
		);
	};

	const pieChartData: PieChartDataItem[] = countEnterpriseTypes(data || []);

	return (
		<PieChart width={280} height={400}>
			<Pie
				activeIndex={activeIndex}
				// activeShape={renderActiveShape}
				data={pieChartData}
				cx={120}
				cy={210}
				innerRadius={60}
				outerRadius={120}
				fill="#8884d8"
				paddingAngle={0}
				dataKey="value"
				nameKey="name"
				onMouseEnter={onPieEnter}
				label={renderCustomizedLabel}
				labelLine={false}
				className="recharts-pie-sector-active"
				stroke="none"
			>
				{pieChartData.map((entry: PieChartDataItem, index: number) => (
					<Cell
						style={{ outline: "none" }}
						key={`cell-${index}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>
		</PieChart>
	);
};
