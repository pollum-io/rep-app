import { format } from "date-fns";
import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface IExample {
	chartData?: any[];
	enterpriseInvestment?: any[];
}

export const Examaple: React.FC<IExample> = props => {
	const { chartData, enterpriseInvestment } = props;

	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length && chartData) {
			return (
				<div className="custom-tooltip">
					<p className="amount">{`${payload[0].value}`}</p>
				</div>
			);
		} else if (active && payload && payload.length && enterpriseInvestment) {
			const formattedDate = format(
				new Date(payload[0]?.payload?.date),
				"MMM, dd"
			);
			return (
				<div className="custom-tooltip">
					<p className="investment_address">{`${formattedDate}`}</p>
					<p className="amount">{`${payload[0].value}`}</p>
				</div>
			);
		}
	};

	const sumAmountsByDate = (array: any) => {
		const result: any = {};
		array.forEach((item: any) => {
			const date = item.date.substring(0, 10);
			const investment_address = item.investment_address;
			if (!result[date]) {
				result[date] = { date, amount: item.amount, investment_address };
			} else {
				result[date].amount += item.amount;
			}
		});
		const sortedResult = Object.values(result).sort((a: any, b: any) =>
			a?.date?.localeCompare(b?.date)
		);

		return sortedResult;
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={chartData ? chartData : sumAmountsByDate(enterpriseInvestment)}
				margin={{
					top: 5,
					bottom: 5,
					right: 5,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					axisLine={false}
					tickLine={false}
					stroke="#ffffff"
					tickFormatter={date => format(new Date(date), "MMM")}
					dataKey="date"
				/>
				<YAxis
					axisLine={false}
					tickLine={false}
					stroke="#ffffff"
					dataKey={"amount"}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: "#ffffff",
						color: "#000000",
						borderRadius: "5px",
						padding: "10px",
						border: "none",
					}}
					wrapperStyle={{ outline: "none" }}
					itemStyle={{ color: "#6c5ce7" }}
					content={CustomTooltip}
				/>
				<Line
					type="monotone"
					dataKey={"amount"}
					stroke="#ffffff"
					activeDot={{ r: 8 }}
					strokeWidth={4}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
