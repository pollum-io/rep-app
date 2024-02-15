import { Flex, Text, Img } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { getYearFromDate } from "../../utils/getYearFromDate";
import { getMonthNameFromDate } from "../../utils/getMonthNameFromDate";
import { formatCurrency } from "../../utils/BRCurrency";
import { useTranslation } from "react-i18next";

type schedule = {
	date?: string;
	value?: number;
};
interface IValueTable {
	isCronograma?: boolean;
	data?: unknown[];
}

const Table: FunctionComponent<IValueTable> = ({ isCronograma, data }) => {
	const { t } = useTranslation();

	const calculateTotalFromArray = useMemo(() => {
		const total = data?.reduce((accumulator, currentValue) => {
			if (currentValue.value !== undefined) {
				return accumulator + currentValue.value;
			}
			return accumulator;
		}, 0);

		return total;
	}, [data]);

	const renderRows = () => {
		return data?.map((item: schedule, index) => (
			<Flex
				key={index}
				px="1rem"
				borderBottom="1px solid #E2E8F0"
				justifyContent="space-between"
				alignItems="center"
				py={"0.5rem"}
			>
				<Flex flex="0.7" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#4BA3B7"}>
						{getYearFromDate(item?.date)}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#171923"}>
						{getMonthNameFromDate(item.date)}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={isCronograma ? "400" : "500"}
						color={"#171923"}
					>
						{isCronograma
							? formatCurrency(item.value)
							: `+ ${formatCurrency(item.value)}`}
					</Text>
					<Img src="/icons/info-circle-gray.svg" />
				</Flex>
			</Flex>
		));
	};

	return (
		<Flex
			border={"1px solid #E2E8F0"}
			flexDir={"column"}
			w={"21.2rem"}
			borderRadius="0.75rem"
		>
			<Flex
				id="table-header"
				bg={"#003243c8"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderTopRadius="0.75rem"
			>
				<Flex flex="0.7">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						{t("portfolio.year")}
					</Text>
				</Flex>
				<Flex flex="1">
					<Text fontSize={"0.75rem"} fontWeight={"500"} color={"white"}>
						{t("opportunitieDetails.Month")}
					</Text>
				</Flex>
				<Flex flex="1" alignItems="center">
					<Text
						fontSize={"0.75rem"}
						fontWeight={"500"}
						color={"white"}
						pr={"1"}
					>
						{t("opportunitieDetails.aporte")}
					</Text>
					<Img src="/icons/info-circle-gray.svg" />
				</Flex>
			</Flex>
			{renderRows()}
			<Flex
				id="table-header"
				bg={"#003243c8"}
				px="1rem"
				py={"0.75rem"}
				justifyContent="space-between"
				alignItems="center"
				borderBottomRadius="0.75rem"
			>
				<Flex flex="0.7">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						{t("opportunitieDetails.total")}
					</Text>
				</Flex>
				<Flex flex={"1"} />
				<Flex flex="1">
					<Text fontSize={"0.875rem"} fontWeight={"semibold"} color={"white"}>
						{formatCurrency(calculateTotalFromArray)}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Table;
