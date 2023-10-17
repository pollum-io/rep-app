import { FunctionComponent } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";

export const OpportunitiesControllContainer: FunctionComponent = ({}) => {
	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}>
				<Text
					color={"#007D99"}
					fontSize={"1.5rem"}
					fontWeight={"500"}
					mt={"1rem"}
					mb={"2rem"}
				>
					Oportunidades
				</Text>
			</Flex>
		</DefaultTemplate>
	);
};
