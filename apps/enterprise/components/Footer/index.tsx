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
			px="4rem"
			py="2rem"
			gap="10rem"
			color="#ffffff"
			flex={"1"}
		>
			<Flex flexDir={"row"} gap="5" alignItems={"center"}>
				<Img src={"/images/livnlogotext.png"} w="5.2763rem" h="1.5rem" />
				<Text fontSize={"sm"} fontWeight="400">
					{t("login.liveInvesting")}
				</Text>
			</Flex>
			<Flex></Flex>
		</Flex>
	);
};
