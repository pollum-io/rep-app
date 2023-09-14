import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Flex,
	Icon,
	Img,
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
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { logout } from "services";

export const HamburguerMenu: React.FC = () => {
	const { push } = useRouter();
	const { userInfos, username, isInvestorPerfilCompleted } = useUser();
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
					onClick={() => push({ pathname: `/faturas` })}
				>
					Faturas
				</MenuItem>
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
					<Flex alignItems={"center"} gap={"0.5rem"}>
						<Text> {t("header.profile")}</Text>
						{!isInvestorPerfilCompleted && (
							<Text
								px={"0.5rem"}
								py={"0.1rem"}
								h={"max"}
								borderRadius={"0.75rem"}
								bgColor={"#FED7D7"}
								color={"#E53E3E"}
								fontSize={"0.75rem"}
								fontWeight={"500"}
							>
								Completar
							</Text>
						)}
					</Flex>
				</MenuItem>
				{/* <Accordion allowMultiple>
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
				</Accordion> */}
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
