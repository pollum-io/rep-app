import {
	Flex,
	Img,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { logout } from "services";

export const HamburguerMenu: React.FC = () => {
	const { push } = useRouter();
	const { userInfos, username, isInvestorPerfilCompleted } = useUser();
	const { t } = useTranslation();

	return (
		<Menu>
			<MenuButton>
				<Flex
					h="max"
					px="0.75rem"
					py="1"
					flexDir={"row"}
					alignItems={"center"}
					gap="3"
					w={"max"}
					border="0.0625rem solid #B1D8DF"
					rounded={"1rem"}
				>
					{!isInvestorPerfilCompleted && <Img src="/icons/notification.svg" />}
					{username ? (
						<Text fontSize={"sm"} fontFamily="Poppins" color={"#FFF"}>
							{t("portfolio.hello", {
								Name: username.slice(0, 8),
							})}
						</Text>
					) : (
						<Text fontSize={"sm"} fontFamily="Poppins" color={"#FFF"}>
							Menu
						</Text>
					)}
					<Flex
						bgColor={"#E2E8F0"}
						borderRadius={"0.8em"}
						h={"max"}
						p={"0.1rem"}
					>
						<Img color="black" src="/images/avatar.svg" w={"5"} h={"4"} />
					</Flex>
				</Flex>
			</MenuButton>
			<MenuList
				zIndex={"999"}
				bgColor="#FFFFFF"
				border="0.0625rem solid #E2E8F0"
				borderRadius="1rem"
				w="12.625rem"
				pb="0.8rem"
				pt="0.8rem"
				filter="drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))"
				justifyContent="center"
			>
				<MenuItem
					fontFamily="Poppins"
					fontSize="0.875rem"
					lineHeight="1.25rem"
					pr="1.1875rem"
					color="#4A5568"
					pl="0.9375rem"
					mt="0.3rem"
					h="1.8rem"
					_focus={{}}
					_hover={{ bgColor: "#F7FAFC", opacity: 0.8 }}
					onClick={() =>
						push({ pathname: `/trocar-senha`, query: { id: userInfos } })
					}
				>
					Trocar senha
				</MenuItem>

				<MenuItem
					fontFamily="Poppins"
					fontSize="0.875rem"
					lineHeight="1.25rem"
					pr="1.1875rem"
					color="#4A5568"
					h="1.8rem"
					pl="0.9375rem"
					_focus={{}}
					_hover={{ bgColor: "#F7FAFC" }}
					onClick={() => {
						logout(push);
					}}
				>
					{t("header.logOut")}
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
