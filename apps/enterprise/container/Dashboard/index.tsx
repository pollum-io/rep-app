import { FunctionComponent, useState, useLayoutEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { GeralInfoEnterpriseComponent } from "../../components/Dashboard/GeralInfoEnterpriseComponent";
import ImoveisTable from "../../components/Dashboard/ImoveisTable/ImoveisTable";
import { EmptyInvest } from "../../components/Dashboard/EmptyInvest";
import { useUser } from "../../hooks/useUser";
import dynamic from "next/dynamic";

const PrevAportesChart = dynamic(
	async () => {
		const mod = await import("../../components/Dashboard/PrevAportesChart");
		return mod.PrevAportesChart;
	},
	{
		ssr: false,
	}
);

const PrevMonthAportesChart = dynamic(
	async () => {
		const mod = await import(
			"../../components/Dashboard/PrevMonthAportesChart"
		);
		return mod.PrevMonthAportesChart;
	},
	{
		ssr: false,
	}
);
interface IDashboardContainer {
	token: string;
	enterpriseData: any;
	enterpriseId: string;
	monthlyForecast: any;
	generalForecast: any;
}

export const DashboardContainer: FunctionComponent<IDashboardContainer> = ({
	enterpriseId,
	token,
	enterpriseData,
	monthlyForecast,
	generalForecast,
}) => {
	const [buttonstate, setButtonState] = useState("todos");
	const [filteredArray, setFilteredArray] = useState<any[]>();
	const [haveInvestment, setHaveInvestment] = useState(true);
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(enterpriseId, token);
	}, [enterpriseId, getUserInfos, token]);

	const filterButtons = [
		{ buttonstate: "todos", label: "Todos" },
		{ buttonstate: "em dia", label: "Em dia" },
		{ buttonstate: "atrasado", label: "Atrasado" },
		{ buttonstate: "pagamento pendente", label: "Pagamento pendente" },
		{ buttonstate: "assinatura pendente", label: "Assinatura pendente" },
		{ buttonstate: "pago", label: "Pago" },
	];

	// const setFilter = useCallback(() => {
	// 	let newArray = [];

	// 	if (buttonstate === "em andamento") {
	// 		newArray = investment?.investments?.filter(
	// 			(invest) => invest?.status === "InProgress"
	// 		);
	// 	} else if (buttonstate === "pedentes") {
	// 		newArray = investment?.investments?.filter(
	// 			(invest) =>
	// 				invest?.status === "PendingPayment" ||
	// 				invest?.status === "PendingSignature"
	// 		);
	// 	} else if (buttonstate === "concluidos") {
	// 		newArray = investment?.investments?.filter(
	// 			(invest) => invest?.status === "Concluded"
	// 		);
	// 	} else if (buttonstate === "todos") {
	// 		newArray = investment?.investments;
	// 	}

	// 	setFilteredArray(newArray);
	// }, [buttonstate, investment?.investments]);

	// useEffect(() => {
	// 	setFilter();
	// }, [buttonstate, setFilter]);

	// const handleStateChange = (newState) => {
	// 	setButtonState(newState);
	// 	setFilter();
	// };
	return (
		<DefaultTemplate>
			<GeralInfoEnterpriseComponent />
			{haveInvestment ? (
				<>
					<Flex margin={"0 auto"} flexDir={"column"}>
						<Flex flexDir={"column"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"2rem"}
							>
								Previsão de aportes totais{" "}
							</Text>
							<PrevAportesChart generalForecast={generalForecast} />
						</Flex>
						<Flex flexDir={"column"} mt={"5rem"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"2rem"}
							>
								Previsão mensal de aportes{" "}
							</Text>
							<PrevMonthAportesChart />
						</Flex>
						<Flex flexDir={"column"} mt={"5rem"}>
							<Text
								color={"#171923"}
								fontWeight={"600"}
								fontSize={"1.5rem"}
								mb={"2rem"}
							>
								Cotistas
							</Text>
							<Flex gap={"1rem"} mb={"2.75rem"}>
								{filterButtons.map((button) => (
									<Button
										key={button.buttonstate}
										borderRadius={"624.9375rem"}
										px={"0.75rem"}
										py={"0.5rem"}
										color={
											buttonstate === button.buttonstate ? "#00262D" : "#718096"
										}
										bgColor={
											buttonstate === button.buttonstate
												? "#B1D8DF"
												: "transparent"
										}
										fontWeight={"500"}
										// onClick={() => handleStateChange(button.buttonstate)}
										_hover={{ opacity: 0.7 }}
									>
										{button.label}
									</Button>
								))}{" "}
							</Flex>
							<Flex>
								<ImoveisTable
									data={filteredArray}
									token={token}
									buttonState={buttonstate}
								/>
							</Flex>{" "}
						</Flex>
					</Flex>
				</>
			) : (
				<EmptyInvest />
			)}
		</DefaultTemplate>
	);
};
