import { FunctionComponent, useState, useLayoutEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { GeralInfoEnterpriseComponent } from "../../components/Dashboard/GeralInfoEnterpriseComponent";
import ImoveisTable from "../../components/Dashboard/ShareholdersTable/ImoveisTable";
import { EmptyInvest } from "../../components/Dashboard/EmptyInvest";
import { useUser } from "../../hooks/useUser";
import dynamic from "next/dynamic";
import { IMonthlyForecast } from "../../types/IMonthlyForecast";
import { IGeneralForecast } from "../../types/IGeneralForecast";
import { fetchEnterpriseShareholders } from "services";
import { useQuery, useQueryClient } from "react-query";

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
	enterpriseId: string;
	monthlyForecast: IMonthlyForecast;
	generalForecast: IGeneralForecast;
}

export const DashboardContainer: FunctionComponent<IDashboardContainer> = ({
	enterpriseId,
	token,
	monthlyForecast,
	generalForecast,
}) => {
	const [buttonstate, setButtonState] = useState("");
	const [filteredArray, setFilteredArray] = useState<any[]>();
	const [haveInvestment, setHaveInvestment] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();

	const { getUserInfos } = useUser();
	useLayoutEffect(() => {
		getUserInfos(enterpriseId, token);
	}, [enterpriseId, getUserInfos, token]);

	const {
		data: dataShare,
		isLoading,
		error,
	} = useQuery(
		["enterpriseShareholdersFilter", enterpriseId, currentPage, buttonstate],
		async () =>
			await fetchEnterpriseShareholders(
				enterpriseId,
				token,
				currentPage,
				buttonstate
			)
	);

	const filterButtons = [
		{ buttonstate: "", label: "Todos" },
		{ buttonstate: "InProgress", label: "Em dia" },
		{ buttonstate: "Overdue", label: "Atrasado" },
		{ buttonstate: "PendingPayment", label: "Pagamento pendente" },
		{ buttonstate: "PendingSignature", label: "Assinatura pendente" },
		{ buttonstate: "Concluded", label: "Pago" },
	];

	const handleShareholdersFilter = (state: string) => {
		setButtonState(state);
		const queryKey = [
			"enterpriseShareholdersFilter",
			enterpriseId,
			currentPage,
			buttonstate,
		];
		queryClient.invalidateQueries(queryKey);
	};

	return (
		<DefaultTemplate>
			<GeralInfoEnterpriseComponent generalForecast={generalForecast} />
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
							<PrevAportesChart
								generalForecast={generalForecast}
								isOpportunityPage={false}
							/>
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
							<PrevMonthAportesChart monthlyForecast={monthlyForecast} />
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
										_hover={{ opacity: 0.7 }}
										onClick={() => handleShareholdersFilter(button.buttonstate)}
									>
										{button.label}
									</Button>
								))}{" "}
							</Flex>
							<Flex>
								<ImoveisTable
									enterpriseId={enterpriseId}
									token={token}
									buttonState={buttonstate}
									dataShare={dataShare}
									error={error}
									isLoading={isLoading}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
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
