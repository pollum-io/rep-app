import { format } from "date-fns";
import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
interface ChartDataItem {
	date: string;
	amount: number;
}

interface InvestmentDataItem {
	date: string;
	amount: number;
	investment_address: string;
}
interface IExample {
	chartData?: ChartDataItem[];
	enterpriseInvestment?: InvestmentDataItem[];
}

type CustomTooltipProps = {
	active: boolean;
	payload?: Array<{ value: number; payload: { date: string } }>;
	label?: string;
};

export const Examaple: React.FC<IExample> = (props) => {
	const { chartData, enterpriseInvestment } = props;

	const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
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

	const sumAmountsByDate = (array: InvestmentDataItem[]): ChartDataItem[] => {
		const result: Record<string, ChartDataItem> = {};
		array.forEach((item) => {
			const date = item.date.substring(0, 10);
			if (!result[date]) {
				result[date] = { date, amount: item.amount };
			} else {
				result[date].amount += item.amount;
			}
		});
		const sortedResult = Object.values(result).sort((a, b) =>
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
					tickFormatter={(date) => format(new Date(date), "MMM")}
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
