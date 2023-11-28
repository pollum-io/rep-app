import { Header } from "../../components/Header";
import { Flex } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import { Footer } from "../../components/Footer";

interface BaseLayoutProps {
	children?: ReactNode;
}

export const DefaultTemplate: FunctionComponent<BaseLayoutProps> = ({
	children,
}) => {
	return (
		<Flex
			id="default-template"
			w="100%"
			h="max"
			minHeight={"100vh"}
			flexDir={"column"}
			bgColor="#ffffff"
		>
			<Header />
			{children}
			<Flex mt={"20.0625rem"}>
				<Footer />
			</Flex>
		</Flex>
	);
};
