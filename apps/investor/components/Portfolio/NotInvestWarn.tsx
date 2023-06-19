import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const NotInvestWarn: FunctionComponent = () => {
	const { push } = useRouter();
	const { t } = useTranslation();

	return (
		<Flex
			flexDirection={"column"}
			justifyContent="center"
			alignItems="center"
			w="100%"
			mb="11.25rem"
			mt="6.1875rem"
		>
			<Text mb="1rem" color="#171923" fontSize={"2xl"} fontWeight={600}>
				{t("portfolio.notInvested")}
			</Text>
			<Text
				mb="2rem"
				color="#171923"
				fontWeight={500}
				w="39.3125rem"
				fontSize="1rem"
				alignItems="center"
				textAlign="center"
			>
				{t("portfolio.textNotInvested")}
			</Text>
			<Button
				fontWeight={500}
				bgColor={"#1789A3"}
				px="55px"
				_hover={{ opacity: 0.9 }}
				color="#ffffff"
			>
				{t("portfolio.buttonNotInvested")}
			</Button>
		</Flex>
	);
};
