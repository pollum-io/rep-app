import { FunctionComponent } from "react";
import { Flex } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";

export const GeneralPanelContainer: FunctionComponent = () => {
	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}></Flex>
		</DefaultTemplate>
	);
};
