import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

interface IPieChart {
	data?: any;
}

export const PieChartPortfolio: React.FC<IPieChart> = props => {
	const { data } = props;
	const [activeIndex, setActiveIndex] = useState(0);
	const onPieEnter = useCallback(
		(_: any, index: any) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);
	const RADIAN = Math.PI / 180;
	const COLORS = ["#2321C0", "#BCA1FF", "#1BA9EA", "#6E40E7"];

	// Conta as instâncias de cada tipo de empresa
	const countByType = data?.reduce((counts: any, item: any) => {
		const type = item.enterprise_type;
		if (type in counts) {
			counts[type]++;
		} else {
			counts[type] = 1;
		}
		return counts;
	}, {});

	// Calcula as porcentagens de cada tipo de empresa
	const total: any = Object?.values(countByType).reduce(
		(sum: any, count: any) => sum + count,
		0
	);
	const percentages = Object.entries(countByType).map(([type, count]: any) => ({
		enterprise_type: type,
		percentage: (count / total) * 100,
	}));

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

	const pieChartData = countEnterpriseTypes(data);

	return (
		<PieChart width={280} height={400}>
			<Pie
				activeIndex={activeIndex}
				activeShape={renderActiveShape}
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
				{pieChartData.map((entry: any, index: any) => (
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
