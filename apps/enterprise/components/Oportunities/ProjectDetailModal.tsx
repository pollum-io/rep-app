import { FunctionComponent } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	Flex,
	Text,
	Button,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { formatCurrency } from "ui";
import { ShareHoldersTableHeader } from "./ShareHoldersTableHeader";
import { ShareHoldersTableRow } from "./ShareHoldersTableRow";
import { ShareHoldersTableFooter } from "./ShareHoldersTableFooter";

const PrevAportesChart = dynamic(
	async () => {
		const mod = await import("../../components/Dashboard/PrevAportesChart");
		return mod.PrevAportesChart;
	},
	{
		ssr: false,
	}
);

interface ICreateAccountModal {
	isOpen: boolean;
	onClose: () => void;
	opportunitiesDetailsToEnteprise: any;
	token?: string;
}

export const ProjectDetailModal: FunctionComponent<ICreateAccountModal> = ({
	isOpen,
	onClose,
	opportunitiesDetailsToEnteprise,
	token,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
			<ModalOverlay />
			<ModalContent
				my={"auto"}
				borderRadius={"1rem"}
				h={"max"}
				py={"1.5rem"}
				px={"1.5rem"}
				maxHeight="90vh"
			>
				<Flex
					flexDir={"column"}
					overflowY="auto"
					overflowX={"hidden"}
					className="scrollbarInvest"
				>
					<Flex
						justifyContent={"space-between"}
						alignItems={"center"}
						mb={"2.75rem"}
					>
						<Flex>
							<Text fontSize={"1.5rem"} color={"#171923"} fontWeight={"600"}>
								Detalhamento{" "}
								{opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? opportunitiesDetailsToEnteprise[0].name
									: "Nome não disponível"}
							</Text>
						</Flex>
						<Flex
							gap={"0.5rem"}
							onClick={() => onClose()}
							cursor={"pointer"}
							_hover={{ opacity: 0.6 }}
							transition={"0.5s"}
						>
							<Text color={"#171923"}>Fechar</Text>
							<Text>X</Text>
						</Flex>
					</Flex>
					<Flex justifyContent={"space-between"} w={"53.5rem"} mb={"4rem"}>
						<Flex flexDir={"column"}>
							<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
								Total arrecadado
							</Text>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								{opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? formatCurrency(
											opportunitiesDetailsToEnteprise[0]?.totalRaised
									  )
									: "Nome não disponível"}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
								Cotistas
							</Text>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								{opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? opportunitiesDetailsToEnteprise[0].totalShareholders
									: "Valor não disponível"}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
								Cotas emitidas
							</Text>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								{opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? opportunitiesDetailsToEnteprise[0].totalCotas
									: "Valor não disponível"}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Text color={"#007D99"} fontSize={"0.875rem"} fontWeight={"500"}>
								Previsão de aportes
							</Text>
							<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
								{opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? formatCurrency(
											opportunitiesDetailsToEnteprise[0]?.contributionForecast
									  )
									: "Valor não disponível"}
							</Text>
						</Flex>
					</Flex>
					<Flex flexDir={"column"} mb={"4rem"}>
						<Text
							color={"#171923"}
							fontSize={"1.25rem"}
							fontWeight={"600"}
							mb={"1.5rem"}
						>
							Cotistas
						</Text>
						<Flex
							w={"53.5rem"}
							flexDir={"column"}
							border={"1px solid #E2E8F0"}
							borderTopRadius={"0.75rem"}
							borderBottomRadius={"0.75rem"}
						>
							<ShareHoldersTableHeader />
							{opportunitiesDetailsToEnteprise &&
							opportunitiesDetailsToEnteprise[0] &&
							Array.isArray(opportunitiesDetailsToEnteprise[0].shareholders)
								? opportunitiesDetailsToEnteprise[0].shareholders.map(
										(data, index) => (
											<ShareHoldersTableRow
												key={index}
												name={data?.name}
												cpfOrCnpj={data?.cpfOrCnpj}
												totalInvested={data?.totalInvested}
												totalCotas={data?.totalCotas}
												totalPaid={data?.totalPaid}
												numInstallments={data?.numInstallments}
												status={data?.status}
												documentKey={data?.documentKey}
												token={token}
											/>
										)
								  )
								: "Valores nao disponíveis"}

							<ShareHoldersTableFooter
								opportunitiesDetailsToEnteprise={
									opportunitiesDetailsToEnteprise
								}
							/>
						</Flex>
					</Flex>
					<Flex flexDir={"column"} mb={"2.75rem"}>
						<Text
							color={"#171923"}
							fontSize={"1.25rem"}
							fontWeight={"600"}
							mb={"1.5rem"}
						>
							Previsão de aportes
						</Text>
						<PrevAportesChart
							isOpportunityPage={true}
							opForecast={
								opportunitiesDetailsToEnteprise &&
								opportunitiesDetailsToEnteprise[0]
									? opportunitiesDetailsToEnteprise[0]?.forecast
									: ""
							}
						/>
					</Flex>
					<Flex justifyContent={"center"}>
						<Button
							px={"1rem"}
							py={"0.625rem"}
							w={"17.25rem"}
							bgColor={"#1789A3"}
							color={"#fff"}
							fontWeight={"500"}
							_hover={{ opacity: 0.7 }}
							onClick={() => onClose()}
						>
							Ok, entendi
						</Button>
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
