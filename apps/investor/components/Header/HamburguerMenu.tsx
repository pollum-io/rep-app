import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
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
import { useWallet } from "../../hooks/useWallet";
import { logout } from "services";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const HamburguerMenu: React.FC = () => {
	const { push } = useRouter();
	const { username } = useUser();
	const { connectWallet, isConnected, address, disconnect } = useWallet();

	const { t, i18n } = useTranslation();
	const { language } = i18n;

	const [onHover, setOnHover] = useState(false);

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
				<Flex w="100%" px="0.9375rem" h="max-content">
					<Button
						padding="0.625rem 0.5rem"
						w="100%"
						h="1.5rem"
						bgColor="#ffffff"
						border="0.0625rem solid #007D99"
						borderRadius="0.375rem"
						fontFamily="Poppins"
						fontWeight="500"
						fontSize="0.75rem"
						lineHeight="1rem"
						color="#007D99"
						_hover={{ bgColor: "#EDF2F7" }}
						_active={{ bgColor: "#E2E8F0" }}
					>
						{isConnected ? (
							<Flex
								alignItems="center"
								gap="0.5rem"
								onMouseEnter={() => setOnHover(true)}
								onMouseLeave={() => setOnHover(false)}
							>
								<Img src="/icons/MetamaskIcon.png" />
								{onHover ? (
									<Text onClick={() => disconnect()}>Disconnect</Text>
								) : (
									<Text>
										{" "}
										{`${address?.slice(0, 5)}...${address?.slice(38)}`}
									</Text>
								)}
							</Flex>
						) : (
							<button onClick={() => connectWallet()}>Connect Wallet</button>
						)}
					</Button>
				</Flex>

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
							mt="0.5rem"
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
