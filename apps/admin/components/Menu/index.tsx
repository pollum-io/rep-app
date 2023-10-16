import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";

export const Menu: React.FC = () => {
	return (
		<Flex
			position={"fixed"}
			h={"3rem"}
			w={"max"}
			bgColor={"#ffffff"}
			pl={"0.75rem"}
			pr={"0.5rem"}
			py={"0.375rem"}
			borderRadius={"1.875rem"}
			boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
			gap={"1rem"}
			alignItems={"center"}
			right={"1%"}
			zIndex="99999"
		>
			<Text fontSize={"0.875rem"} color={"#007088"}>
				Olá, João Antônio
			</Text>
			<Img src="/logos/notification.svg" w={"1.5rem"} h={"1.5rem"} />
			<Flex
				bg={"#E2E8F0"}
				borderRadius={"468.7031rem"}
				p={" 5.25px 4.5px 0px 4.5px"}
			>
				<Img src="/logos/user-icon.svg" />
			</Flex>
		</Flex>
	);
};
