import React, { FunctionComponent, useMemo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { ITimelineSteps } from "../../dtos/ITimelineSteps";

export const TimelineComponent: FunctionComponent<ITimelineSteps> = ({
	descriptions,
	title,
	titleWidth,
	status,
}) => {
	const iconStatus = useMemo(() => {
		if (status === "Completed") {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#007088"}
					w="1.9737rem"
					h="1.9737rem"
					p={"0.375rem"}
					justifyContent="center"
					alignItems="center"
				>
					<BsCheck size={25} color="white" />
				</Flex>
			);
		} else if (status === "Not completed") {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#007088"}
					w="1.9737rem"
					p={"0.375rem"}
					h="1.9737rem"
					justifyContent="center"
					alignItems="center"
				>
					<Text
						color={"#FFFFFF"}
						fontFamily="Poppins"
						fontStyle="normal"
						fontWeight={"500"}
						fontSize="0.875rem"
						lineHeight="1.25rem"
					>
						{title}
					</Text>
				</Flex>
			);
		} else {
			return (
				<Flex
					borderRadius="full"
					bgColor={"#EDF2F7"}
					w="1.9737rem"
					h="1.9737rem"
					p={"0.375rem"}
					justifyContent="center"
					alignItems="center"
				>
					<Text
						color={"#6F6C90"}
						fontFamily="Poppins"
						fontStyle="normal"
						fontWeight={"400"}
						fontSize="0.875rem"
						lineHeight="1.25rem"
					>
						{title}
					</Text>
				</Flex>
			);
		}
	}, [status, title]);

	return (
		<Flex gap="0.7762rem" alignItems="start" pb={"1rem"} pr={"2rem"}>
			{iconStatus}
			<Flex flexDirection="column" pt="0.1rem" h="100%" gap="0.1913rem">
				{descriptions.map((description) => {
					let textColor = "#A0AEC0";
					let fontWeight = "400";
					if (description.status === "Completed") {
						textColor = "#000000";
						fontWeight = "400";
					} else if (description.status === "In progress") {
						textColor = "#007088";
						fontWeight = "500";
					}
					return (
						<Text
							key={description.text}
							color={textColor}
							fontFamily="Poppins"
							fontWeight={fontWeight}
							fontSize="0.75rem"
							lineHeight="1rem"
							w={titleWidth ? titleWidth : "8rem"}
						>
							{description.text}
						</Text>
					);
				})}
			</Flex>
		</Flex>
	);
};
