import { Login } from "../../components/Pages/Login";
import { UserDataPF, UserDataPJ } from "ui";
import { FunctionComponent, useEffect, useState } from "react";
import {
	Button,
	Flex,
	Img,
	Text,
	useDisclosure,
	useMediaQuery,
} from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { GeralInfoEnterpriseComponent } from "../../components/Dashboard/GeralInfoEnterpriseComponent";
import PrevAportesChart from "../../components/Dashboard/PrevAportesChart";
import PrevMonthAportesChart from "../../components/Dashboard/PrevMonthAportesChart";
import ImoveisTable from "./ImoveisTable/ImoveisTable";
import { EmptyInvest } from "./EmptyInvest";

interface IDashboardContainer {
	token: string;
	userDataPJ: UserDataPF;
	investorPjId: string;
}

export const DashboardContainer: FunctionComponent<IDashboardContainer> = ({
	investorPjId,
	token,
	userDataPJ,
}) => {
	const [buttonstate, setButtonState] = useState("todos");
	const [filteredArray, setFilteredArray] = useState<any[]>();

	const [haveInvestment, setHaveInvestment] = useState(true);

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
							<PrevAportesChart />
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
