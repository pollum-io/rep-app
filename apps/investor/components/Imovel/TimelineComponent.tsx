import React, { FunctionComponent } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { ITimelineSteps } from "../../dtos/ITimelineSteps";

export const TimelineComponent: FunctionComponent<ITimelineSteps> = ({
	descriptionOne,
	descriptionTwo,
	descriptionThree,
	descriptionFour,
	titleWidth,
}) => {
	const barStatus = 0 | 100;
	return (
		<Flex gap="0.7762rem" alignItems="start" pb={"1rem"} pr={"2rem"}>
			<Flex
				borderRadius="full"
				bgColor={barStatus !== 0 ? "#007088" : "#EDF2F7"}
				w="1.9737rem"
				h="1.9737rem"
				justifyContent="center"
				alignItems="center"
			>
				<Text
					color={barStatus !== 0 ? "#FFFFFF" : "#6F6C90"}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus === 0 ? "600" : "400"}
					fontSize="0.875rem"
					lineHeight="1.25rem"
				>
					{barStatus === 100 ? <BsCheck size={25} /> : "1Tri"}
				</Text>
			</Flex>
			<Flex flexDirection="column" pt="0.1rem" h="100%" gap="0.1913rem">
				<Text
					color={
						barStatus !== 0
							? barStatus === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={titleWidth ? titleWidth : "8rem"}
				>
					{descriptionOne}
				</Text>
				<Text
					color={
						barStatus !== 0
							? barStatus === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={titleWidth ? titleWidth : "8rem"}
				>
					{descriptionTwo}
				</Text>
				<Text
					color={
						barStatus !== 0
							? barStatus === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={titleWidth ? titleWidth : "8rem"}
				>
					{descriptionThree}
				</Text>
				<Text
					color={
						barStatus !== 0
							? barStatus === 50
								? "#007088"
								: "#000000"
							: "#A0AEC0"
					}
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight={barStatus !== 0 ? "500" : "400"}
					fontSize="0.75rem"
					lineHeight="1rem"
					w={titleWidth ? titleWidth : "8rem"}
				>
					{descriptionFour}
				</Text>
			</Flex>
		</Flex>
	);
};
