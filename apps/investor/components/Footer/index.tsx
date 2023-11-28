import { Flex, Img, Text } from "@chakra-ui/react";
import { FooterLinks } from "./FooterLinks";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Flex
			w="100%"
			h="max"
			borderTopRadius="2xl"
			bgColor={"#1789A3"}
			px="2.8125rem"
			py="1rem"
			gap="10rem"
			color="#ffffff"
			flex={"1"}
		>
			<Flex flexDir={"column"} gap="0.4375rem"></Flex>
		</Flex>
	);
};
