import { FunctionComponent, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Menu } from "../../components/Menu";

interface BaseLayoutProps {
	children?: ReactNode;
}

export const DefaultTemplate: FunctionComponent<BaseLayoutProps> = ({
	children,
}) => {
	return (
		<Flex p={"1rem"} h={"100%"} minH={"100vh"} bgColor={"#F7FAFC"}>
			<Sidebar />
			<Menu />
			<Flex ml={"16rem"}>{children}</Flex>
		</Flex>
	);
};
