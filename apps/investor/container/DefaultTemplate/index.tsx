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
			minHeight={"100vh"} // Set minHeight to full viewport height
			flexDir={"column"}
			bgColor="#ffffff"
		>
			<Header />
			<Flex
				flex="1" // Allow content to grow and fill remaining space
				flexDirection="column"
			>
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};
