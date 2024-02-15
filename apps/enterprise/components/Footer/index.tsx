import { Flex, Text } from "@chakra-ui/react";
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
			<Flex flexDir={"row"} gap="5" alignItems={"center"}>
				<Text fontSize={"sm"} fontWeight="400">
					{t("login.liveInvesting")}
				</Text>
			</Flex>
			<Flex></Flex>
		</Flex>
	);
};
