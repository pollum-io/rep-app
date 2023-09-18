import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { DefaultTemplate } from "../DefaultTemplate";
import { motion } from "framer-motion";
import { CompaniePage } from "../../components/Pages/CompaniePage";

export const MyProfileContainer: NextPage = () => {
	return (
		<DefaultTemplate>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<CompaniePage />
			</motion.div>
		</DefaultTemplate>
	);
};
