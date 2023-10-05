import React, { useRef } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Text,
} from "@chakra-ui/react";
import { Header } from "ui";

interface IDrawerComponent {
	onClose: any;
	isOpen: any;
}

export const DrawerComponent: React.FC<IDrawerComponent> = ({
	isOpen,
	onClose,
}) => {
	const btnRef = useRef();

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size={"full"}
		>
			<DrawerOverlay />
			<DrawerContent w={"100%"}>
				<DrawerCloseButton onClick={onClose} />
				<Flex flexDir={"column"}>
					<Flex
						justifyContent={"center"}
						w={"100vw"}
						h={"2.75rem"}
						bgImage={"linear-gradient(98deg, #BBA1FF 6.1%, #68E4FF 103.66%)"}
						px={"0.75rem"}
						py={"0.5rem"}
						alignItems={"center"}
					>
						<Text fontSize={"0.875rem"} color={"#fff"} fontWeight={"500"}>
							Este é apenas um preview da página da empresa da perscpetiva do
							investidor
						</Text>
					</Flex>
					<Header isDrawer={true} />
				</Flex>
			</DrawerContent>
		</Drawer>
	);
};
