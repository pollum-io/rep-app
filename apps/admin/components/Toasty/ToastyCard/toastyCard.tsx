import { Flex, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import { AiFillExclamationCircle } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IToastyCardProps } from "./dto";

const cards: { [k: string]: [string, IconType, number] } = {
	success: ["#38A169", RiCheckboxCircleFill, 19],
	error: ["#E53E3E", AiFillExclamationCircle, 18],
	warning: ["#DD6B20", AiFillExclamationCircle, 18],
	info: ["#1789A3", IoIosInformationCircle, 20],
};

export const ToastyCard: React.FC<IToastyCardProps> = ({
	bg,
	text,
	state,
	onClose,
}) => {
	const toastData = useMemo(() => {
		const card = cards[state.status ?? "info"];

		const color = card[0];
		const Icon = card[1];

		return {
			color,
			icon: <Icon color={color} size={card[2]} />,
		};
	}, [state.status]);
	return (
		<Flex
			h="max-content"
			w={["18.75rem", "22.25rem", "22.25rem", "22.25rem", "22.30rem"]}
			mt="2.125rem"
			mr={["unset", "1.5rem", "2.5rem", "2.5rem"]}
			pr="0.6875rem"
			bg={bg}
			borderRadius="0.375rem"
			justifyContent="space-between"
			boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)"
			flexDir="column"
		>
			<Flex
				color={text}
				flexDirection="row"
				pr="0.3rem"
				w="100%"
				position="relative"
				justifyContent="space-between"
			>
				<Flex>
					<Flex
						borderLeftRadius="0.375rem"
						bgColor={toastData.color}
						w="0.35rem"
						h="100%"
					/>

					<Flex
						position="relative"
						alignItems="flex-top"
						w="100%"
						gap="0.875rem"
						ml="0.8rem"
						py="0.75rem"
					>
						<Flex pt="0.1rem">{toastData.icon}</Flex>
						<Flex flexDirection="column">
							<Text
								fontWeight="700"
								fontSize="0.875rem"
								lineHeight="1.5rem"
							>{`${state?.title}`}</Text>
							<Text fontSize="0.75rem" fontWeight="normal">
								{state.description}
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex _hover={{ cursor: "pointer" }} onClick={onClose} py="0.75rem">
					<MdOutlineClose size={16} color={text} />
				</Flex>
			</Flex>
		</Flex>
	);
};
