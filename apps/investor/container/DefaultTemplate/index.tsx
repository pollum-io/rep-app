import { Login } from "../../components";
import { NextPage } from "next";
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
			h="100%"
			flexDir={"column"}
			bgColor="#FFFFFF"
		>
			<Header />
			{children}
			<Footer />
		</Flex>
	);
};
