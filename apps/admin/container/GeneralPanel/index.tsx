import { FunctionComponent } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { GeneralPanelInfoCards } from "../../components/GeneralPanel/GeneralPanelInfoCards";
import { WaitListCard } from "../../components/GeneralPanel/WaitListCard";
import { Pendencias } from "../../components/GeneralPanel/Pendencias";

export const GeneralPanelContainer: FunctionComponent = () => {
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
					Painel geral
				</Text>
				<Flex flexDir={"column"} maxW={"62.625rem"} justifyContent={"stretch"}>
					<Flex gap={"2rem"} mb={"2.75rem"}>
						<GeneralPanelInfoCards />
					</Flex>
					<Flex gap={"2rem"}>
						<WaitListCard />
						<Pendencias />
					</Flex>
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
