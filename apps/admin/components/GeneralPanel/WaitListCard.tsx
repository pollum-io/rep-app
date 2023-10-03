import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";

export const WaitListCard: React.FC = () => {
	return (
		<Flex
			w={"36.75rem"}
			bgColor={"#fff"}
			borderRadius={"1.25rem"}
			p={"1rem"}
			gap={"1.5rem"}
			flexDir={"column"}
		>
			<Flex alignItems={"center"} w={"100%"} justifyContent={"space-between"}>
				<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
					Waitlist
				</Text>
				<Flex alignItems={"center"} gap={"0.75rem"}>
					<Text color={"#2D3748"} fontSize={"0.75rem"}>
						7 de 320 resultados
					</Text>
					<Button
						px={"0.5rem"}
						py="0.625rem"
						border={"1px solid #007D99"}
						bgColor={"transparent"}
						fontWeight={"400"}
						color={"#007D99"}
						borderRadius={"3.0625rem"}
						h={"1.5rem"}
						fontSize={"0.75rem"}
					>
						Ver todos
					</Button>{" "}
				</Flex>
			</Flex>
			<Flex
				border={"1px solid #EDF2F7"}
				px={"0.75rem"}
				py={"0.5rem"}
				gap={"1rem"}
				alignItems={"center"}
				borderRadius={"0.75rem"}
			>
				<Flex
					flexDir={"column"}
					w={"11.25rem"}
					overflow={"hidden"}
					textOverflow={"ellipsis"}
				>
					<Text
						textOverflow={"ellipsis"}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						maxWidth={"11.25rem"}
						color={"#171923"}
						fontSize={"0.75rem"}
						fontWeight={"500"}
					>
						Ana Carola Oliveira e Costa de Carvalo
					</Text>
					<Text
						textOverflow={"ellipsis"}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						maxWidth={"11.25rem"}
						color={"#2D3748"}
						fontSize={"0.75rem"}
					>
						aninha_1998736@gmail.com
					</Text>
				</Flex>
				<Img
					transition={"0.5s"}
					_hover={{ cursor: "pointer", opacity: 0.6 }}
					src="/logos/copy.svg"
				/>
				<Flex>
					<Text
						textOverflow={"ellipsis"}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						maxWidth={"11.25rem"}
						color={"#2D3748"}
						fontSize={"0.75rem"}
					>
						48 99999 9999
					</Text>
				</Flex>
				<Img
					transition={"0.5s"}
					_hover={{ cursor: "pointer", opacity: 0.6 }}
					src="/logos/copy.svg"
				/>
				<Flex w={"6.3125rem"}>
					<Text color={"#2D3748"} fontSize={"0.75rem"}>
						Brasil
					</Text>
				</Flex>
				<Flex>
					<Text
						py={"0.625rem"}
						px={"0.5rem"}
						fontWeight={"500"}
						color={"#007D99"}
						fontSize={"0.75rem"}
					>
						Aprovar
					</Text>
				</Flex>
			</Flex>
			<Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
				<Flex bgColor={"#718096"} borderRadius={"6.25rem"} p="0.75rem">
					<Img src={"/logos/leftArrow.svg"} />
				</Flex>
				<Flex>1 2 3 4</Flex>
				<Flex bgColor={"#718096"} borderRadius={"6.25rem"} p="0.75rem">
					<Img src={"/logos/rightArrow.svg"} />
				</Flex>
			</Flex>
		</Flex>
	);
};
