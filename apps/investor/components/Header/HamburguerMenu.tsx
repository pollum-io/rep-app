import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useUser } from "../../hooks/useUser";
import { logout } from "../../services/fetchLogout";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export const HamburguerMenu: React.FC = () => {
	const { push } = useRouter();
	const { userInfos, username } = useUser();

	const { t, i18n } = useTranslation();
	const { language } = i18n;

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
					border="0.0625rem solid #E2E8F0"
					rounded={"1rem"}
				>
					{username ? (
						<Text fontSize={"sm"} fontFamily="Poppins" color={"#4A5568"}>
							{t("portfolio.hello", {
								Name: username.slice(0, 8),
							})}
						</Text>
					) : (
						<Text fontSize={"sm"} fontFamily="Poppins" color={"#4A5568"}>
							Menu
						</Text>
					)}
					<Icon color="black" as={FiMenu} />
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
						push({ pathname: `/usuario`, query: { id: userInfos } })
					}
				>
					{t("header.profile")}
				</MenuItem>
				<Accordion allowMultiple>
					<AccordionItem border="none">
						<AccordionButton
							background="none"
							_hover={{ bgColor: "#FFF" }}
							_focus={{
								background: "none !important",
							}}
							w="100%"
							pr="1.1875rem"
							pl="1rem"
							h="1.8rem"
						>
							<Flex justifyContent="space-between" alignItems="center" w="100%">
								<Text
									fontFamily="Poppins"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#4A5568"
								>
									{t("header.lang")}
								</Text>

								<AccordionIcon color="#666c77" />
							</Flex>
						</AccordionButton>

						<AccordionPanel p="0" pb="0.375rem" pt="0.375rem" fontWeight="400">
							<Flex flexDirection="column" gap="0.25rem">
								<Flex
									justifyContent="space-between"
									_hover={{ bgColor: "#F7FAFC", cursor: "pointer" }}
									pr="1.22rem"
									pl="1.625rem"
									py="0.2rem"
									onClick={() => {
										i18next.changeLanguage("br");
									}}
									bgColor={language === "br" ? "#F7FAFC" : "#ffffff"}
								>
									<Text
										fontFamily="Poppins"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color="#4A5568"
									>
										{t("header.pt")}
									</Text>
									<Flex display={language === "br" ? "flex" : "none"}>
										<BsCheck color="#1789A3" size={18} />
									</Flex>
								</Flex>
								<Flex
									justifyContent="space-between"
									_hover={{ bgColor: "#F7FAFC", cursor: "pointer" }}
									pr="1.25rem"
									pl="1.625rem"
									py="0.2rem"
									onClick={() => {
										i18next.changeLanguage("en");
									}}
									bgColor={language === "en" ? "#F7FAFC" : "#ffffff"}
								>
									<Text
										fontFamily="Poppins"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color="#4A5568"
									>
										{t("header.en")}
									</Text>
									<Flex display={language === "en" ? "flex" : "none"}>
										<BsCheck color="#1789A3" size={18} />
									</Flex>
								</Flex>
							</Flex>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
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
