import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Maps } from "../../Maps";
import { InvestmentModel } from "../../../dtos/IInvestment";
import ImoveisTable from "../ImoveisTable/ImoveisTable";
import { useQuery } from "react-query";
import { fetchInvestmentByUser } from "services";

const PieChartComponent = dynamic(
	async () => {
		const mod = await import("ui/Imovel/ImovelOverviewComponents/");
		return mod.PieChartComponent;
	},
	{
		ssr: false,
	}
);

type ComponentProps = {
	token: string;
};

export const MeusInvestimentosPage: React.FC<ComponentProps> = (props) => {
	const {
		data: investment,
		isError: isErrorInvestment,
		isLoading: isLoadingInvestment,
	} = useQuery(
		["investment", props?.token],
		async () => {
			try {
				return await fetchInvestmentByUser(props?.token);
			} catch (error) {
				throw new Error("Erro ao buscar investimento");
			}
		},
		{
			refetchInterval: 3000, // Refetch a cada 5 segundos
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
		}
	);

	const [buttonstate, setButtonState] = useState("todos");
	const [filteredArray, setFilteredArray] = useState<InvestmentModel[]>();

	const filterButtons = [
		{ buttonstate: "todos", label: "Todos", disabled: false },
		{ buttonstate: "em andamento", label: "Em andamento", disabled: true },
		{ buttonstate: "pedentes", label: "Pendentes", disabled: true },
		{ buttonstate: "concluidos", label: "Concluídos", disabled: true },
	];

	const setFilter = useCallback(() => {
		let newArray = [];

		if (buttonstate === "em andamento") {
			newArray = investment?.investments?.filter(
				(invest) => invest?.status === "InProgress"
			);
		} else if (buttonstate === "pedentes") {
			newArray = investment?.investments?.filter(
				(invest) =>
					invest?.status === "PendingPayment" ||
					invest?.status === "PendingSignature"
			);
		} else if (buttonstate === "concluidos") {
			newArray = investment?.investments?.filter(
				(invest) => invest?.status === "Concluded"
			);
		} else if (buttonstate === "todos") {
			newArray = investment?.investments;
		}

		setFilteredArray(newArray);
	}, [buttonstate, investment?.investments]);

	useEffect(() => {
		setFilter();
	}, [buttonstate, setFilter]);

	const handleStateChange = (newState) => {
		setButtonState(newState);
		setFilter();
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Flex flexDir={"column"} mb={"1rem"} w={"100%"}>
					<Flex flexDir={"column"} pb={"11.8125rem"}>
						<Flex alignItems={"center"} mb={"2rem"} gap={"0.4375rem"}>
							<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
								Distribuição total de investimentos{" "}
							</Text>
							{/* <MenuPieChartChart
								title="Investimentos"
								defaultSelection="Todos os imóveis"
							/> */}
						</Flex>
						<Flex>
							<PieChartComponent data={investment?.investments} />
						</Flex>
						<Flex mt={"4.5rem"}>
							<Text color={"#171923"} fontWeight={"600"} fontSize={"1.5rem"}>
								Meus investimentos
							</Text>
						</Flex>
						<Flex mt={"2rem"} mb={"1.5rem"}>
							<Flex gap={"1rem"}>
								{filterButtons.map((button) => (
									<Button
										key={button.buttonstate}
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={
											buttonstate === button.buttonstate ? "#fff" : "#718096"
										}
										bgColor={
											buttonstate === button.buttonstate
												? "#003243c8"
												: "transparent"
										}
										fontWeight={"500"}
										onClick={() => handleStateChange(button.buttonstate)}
										_hover={{ opacity: 0.7 }}
										isDisabled={button.disabled}
									>
										{button.label}
									</Button>
								))}{" "}
							</Flex>

							<Flex ml={"4rem"}>
								{/* <MenuPieChartChart
									title="Tipo"
									titleColor="#171923"
									defaultSelection="Todos os imóveis"
								/> */}
								{/* <InputGroup>
									<InputRightElement pointerEvents="none">
										<BiSearch color="gray.300" />
									</InputRightElement>
									<Input
										w={"16.5rem"}
										px={"0.75rem"}
										py={"0.375rem"}
										h={"max"}
										ml={"5rem"}
										fontSize={"0.875rem"}
										_placeholder={{ color: "#A0AEC0" }}
										borderRadius={"0.375rem"}
										placeholder="Pesquisar por nome"
									/>{" "}
								</InputGroup> */}
							</Flex>
						</Flex>
						<Flex>
							<ImoveisTable
								data={filteredArray}
								token={props?.token}
								buttonState={buttonstate}
							/>
						</Flex>
						<Flex mt={"4rem"} flexDir={"column"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"1.5rem"}
							>
								Onde você tem investido{" "}
							</Text>
							<Flex>
								<Maps investmentData={investment?.investments} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</motion.div>
		</>
	);
};
