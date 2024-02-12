import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { ContributionScheduleTable } from "../ContributionScheduleTable";

type ComponentProps = {
	data?: unknown;
	total_invested?: number;
};

export const CronogramaAportesComponent: React.FC<ComponentProps> = ({
	data,
	total_invested,
}) => {
	return (
		<Flex mb={"2rem"} flexDir={"column"} gap={"0.75rem"}>
			<Flex alignItems={"center"} mb={"2rem"} gap={"0.75rem"}>
				<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
					Cronograma de aportes{" "}
				</Text>
				<Img src="/icons/info-circle-littlegray.svg" />
			</Flex>
			<ContributionScheduleTable data={data} total_invested={total_invested} />
			<Text fontSize={"0.875rem"} color={"#171923"} w={"60%"} mt={"1rem"}>
				Espaço pra alguma explicação se necessário. Lorem ipsum dolor sit amet
				consectetur. A molestie at lacus lobortis orci id tellus mi. Adipiscing
				non pellentesque pellentesque bibendum in dui. Accumsan pulvinar nisi eu
				ridiculus.
			</Text>
		</Flex>
	);
};
