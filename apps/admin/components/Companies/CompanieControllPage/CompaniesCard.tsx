import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

// type ComponentProps = {};

export const CompaniesCard: React.FC = () => {
	const [state] = useState();

	return (
		<Flex
			px={"1rem"}
			py={"0.75rem"}
			border={"1px solid #EDF2F7"}
			borderRadius={"0.75rem"}
			flexDir={"row"}
		>
			<Flex
				bgColor={"#9E7AFA"}
				borderRadius={"624.9375rem"}
				w={"5rem"}
				h={"4rem"}
				justifyContent={"center"}
				alignItems={"center"}
				mr={"1rem"}
			>
				<Text color={"white"} fontSize={"1.625rem"}>
					SA
				</Text>
			</Flex>
			<Flex flexDir={"column"} w={"100%"} gap={"0.75rem"}>
				<Flex
					flexDir={"row"}
					alignItems={"center"}
					w={"100%"}
					justifyContent={"space-between"}
				>
					<Flex>
						<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"500"}>
							Nome da Empresa{" "}
						</Text>
						{!state && (
							<Flex
								fontSize={"0.75rem"}
								fontWeight={"500"}
								bg={"#FFF5F5"}
								color={"#E53E3E"}
								borderRadius={"2.6875rem"}
								h={"1.25rem"}
								ml={"1rem"}
								p={"0.5rem"}
								alignItems={"center"}
							>
								Criação não concluída
							</Flex>
						)}
					</Flex>
					{!state ? (
						<Flex
							fontSize={"0.75rem"}
							fontWeight={"500"}
							color={"#E53E3E"}
							borderRadius={"2.6875rem"}
							h={"1.25rem"}
							m={"0"}
							p={"0.5rem"}
							alignItems={"center"}
							transition={"0.3s"}
							_hover={{ opacity: 0.7, cursor: "pointer" }}
						>
							Retomar criação
						</Flex>
					) : (
						<Text
							fontWeight={"500"}
							fontSize={"0.75rem"}
							color={"#007D99"}
							transition={"0.3s"}
							_hover={{ opacity: 0.7, cursor: "pointer" }}
						>
							Editar
						</Text>
					)}
				</Flex>
				<Flex w={"100%"} justifyContent={"space-between"}>
					<Flex alignItems={"center"} gap={"0.5rem"} w={"11.875rem"}>
						<Text fontSize={"0.75rem"} color={"#718096"}>
							Oportunidades Disponíveis
						</Text>
						<Text color={"#171923"}></Text>
					</Flex>
					<Flex alignItems={"center"} gap={"0.5rem"} w={"6.3125rem"}>
						<Text fontSize={"0.75rem"} color={"#718096"}>
							Encerradas
						</Text>
						<Text color={"#171923"}>-</Text>
					</Flex>
					<Flex alignItems={"center"} gap={"0.5rem"} w={"7.125rem"}>
						<Text fontSize={"0.75rem"} color={"#718096"}>
							Receita
						</Text>
						<Text color={"#171923"}>R$ -</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
