import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui";

interface IShareHoldersTableFooter {
	opportunitiesDetailsToEnteprise?: unknown;
}

export const ShareHoldersTableFooter: React.FC<IShareHoldersTableFooter> = ({
	opportunitiesDetailsToEnteprise,
}) => {
	const total = (opportunitiesDetailsToEnteprise[0]?.shareholders || [])
		.map((data) => data?.totalInvested || 0)
		.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	return (
		<Flex
			w={"100%"}
			bg={"#1789A3"}
			px={"1rem"}
			py={"0.75rem"}
			gap={"1.5rem"}
			borderBottomRadius={"0.75rem"}
		>
			<Text
				w={"11.25rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
			>
				Total:
			</Text>
			<Text
				w={"8.75rem"}
				color={"#fff"}
				fontSize={"0.875rem"}
				fontWeight={"600"}
			>
				{formatCurrency(total)}
			</Text>
		</Flex>
	);
};
