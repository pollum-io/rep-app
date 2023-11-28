import { FunctionComponent } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { GeneralPanelInfoCards } from "../../components/GeneralPanel/GeneralPanelInfoCards";
import { WaitListCard } from "../../components/GeneralPanel/WaitListCard";
import { Pendencies } from "../../components/GeneralPanel/Pendencies";

interface IGeneralPanelContainer {
	adminData: any;
}

export const GeneralPanelContainer: FunctionComponent<
	IGeneralPanelContainer
> = ({ adminData }) => {
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
				<Flex flexDir={"column"} maxW={"62.625rem"}>
					<Flex gap={"2rem"} mb={"2.75rem"}>
						<GeneralPanelInfoCards cardsData={adminData} />
					</Flex>
					<Flex gap={"2rem"}>
						<WaitListCard />
						<Pendencies pendenciesData={adminData} />
					</Flex>
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
