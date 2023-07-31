import React, { FunctionComponent } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiHome, FiBriefcase, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { logout } from "../../services/fetchLogout";

interface ISideBar {
	getPage: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar: FunctionComponent<ISideBar> = ({ getPage }) => {
	const { push } = useRouter();

	const sidebarLinks = [
		{ label: "Home", icon: FiHome, path: "/" },
		{ label: "Oportunidades", icon: FiBriefcase, path: "/oportunidades" },
	];

	const handleLogout = () => {
		logout(push);
	};

	return (
		<>
			{/* Sidebar */}
			<Flex
				flexDir={"column"}
				p={"10"}
				as="nav"
				w="max" // Set your desired width for the sidebar
				h="100vh"
				bg="#1789A3" // Set your desired sidebar background color
				color="white" // Set your desired text color
				pos="fixed"
				top="0"
				left="0"
				zIndex="999"
				shadow="lg"
				boxShadow="1px 4px 20px 3px rgb(0 0 0 / 48%), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)"
			>
				<Flex justify={"center"} align="center" h="60px">
					<Text fontSize="1.5rem" fontWeight="bold">
						LIVN Admin
					</Text>
				</Flex>
				<Flex flexDir={"column"}>
					{sidebarLinks.map((link, index) => (
						<Flex
							key={index}
							display="flex"
							alignItems="center"
							py="0.5rem"
							px={"1rem"}
							onClick={() => getPage(link.label)}
							borderRadius={"0.75rem"}
							_hover={{ bg: "#ffffff42", cursor: "pointer" }} // Set the hover background color
							_focus={{ outline: "none" }}
						>
							<Icon as={link.icon} fontSize="1.2rem" />
							<Text fontSize="1rem" ml="1rem">
								{link.label}
							</Text>
						</Flex>
					))}
				</Flex>
				<Flex position={"relative"} top={"44rem"} alignItems="center" w={"max"}>
					<Flex
						borderRadius={"0.75rem"}
						_hover={{ bg: "#ffffff42", cursor: "pointer" }} // Set the hover background color
						_focus={{ outline: "none" }}
						onClick={handleLogout}
						alignItems="center"
						py="0.5rem"
						display="flex"
						px={"1rem"}
					>
						<Icon as={FiLogOut} fontSize="1.2rem" />
						<Text fontSize="1rem" ml="1rem">
							Sair
						</Text>
					</Flex>
				</Flex>
			</Flex>

			{/* Main Content */}
			<Box ml={{ base: 0, md: "220px" }} p="1rem">
				{" "}
				{/* Add margin left to main content to accommodate the sidebar */}
				{/* Your main dashboard content goes here */}
			</Box>
		</>
	);
};
