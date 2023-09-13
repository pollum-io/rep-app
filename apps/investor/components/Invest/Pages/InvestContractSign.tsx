import React, { useEffect, useState } from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";
import { useRegisterSteps } from "../../../hooks";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { useUser } from "../../../hooks/useUser";
import { FiCheckCircle } from "react-icons/fi";
import { useQuery } from "react-query";
import { fetchGetInvestmentById } from "services";

interface IContractSign {
	imovel?: IOpportunitiesCard;
	token: string;
	setContribution: any;
}

export const InvestContractSign: React.FC<IContractSign> = ({
	imovel,
	token,
	setContribution,
}) => {
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { cotas } = useOpportunities();
	const { docLink, investmentId, setContributionId } = useUser();
	const [isConfirmed, setIsConfirmed] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const openLinkInNewTab = () => {
				if (docLink) {
					window.open(docLink, "_blank");
				}
			};
			openLinkInNewTab();
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [docLink]);

	const { data: investment, isLoading } = useQuery(
		["investment", investmentId],
		async () => {
			try {
				const res = await fetchGetInvestmentById(investmentId, token);
				setContributionId(res.contribution_id);
				setContribution(res.contribution_id);
				return res;
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

	useEffect(() => {
		if (
			!isLoading &&
			investment?.status === "PendingPayment" &&
			investment?.contribution_id
		) {
			setContribution(investment.contribution_id);
			setContributionId(investment.contribution_id);
			setIsConfirmed(true);
			setFirstStep(false);
			setSecondStep(false);
		}
	}, [
		investment,
		setContributionId,
		setIsConfirmed,
		setFirstStep,
		setSecondStep,
		setContribution,
		isLoading,
	]);

	return (
		<Flex w="100%" gap="5%" justifyContent="space-between" mb="12rem">
			<Flex flexDir={"column"}>
				<Flex flexDir={"column"}>
					<Text
						mb={"1.4688rem"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
					>
						Quase lá!{" "}
					</Text>
					<Text
						mb={"0.5"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
						w={"95%"}
					>
						Assine o contrato na nova aba aberta no seu navegador.{" "}
					</Text>
					<Text mt={"1rem"} fontSize={"0.875rem"} color={"#000"} w={"82%"}>
						Para liberar o pagamento e concluir seu investimento é necessário
						assinar o contrato de compra. Assim que concluída a assinatura você
						será redirecionado para o pagamento.
					</Text>
				</Flex>
				<Flex
					gap={"0.5rem"}
					mt={"1.5rem"}
					flexDir={"row"}
					alignItems={"center"}
				>
					{isConfirmed === false ? (
						<Oval
							height={35}
							width={35}
							color="#1789A3"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="oval-loading"
							secondaryColor="#bdbdbd"
							strokeWidth={4}
							strokeWidthSecondary={4}
						/>
					) : (
						<FiCheckCircle className="confirmed-icon" />
					)}
					<Text color={"#718096"} fontSize={"0.875rem"}>
						Aguardando assinatura...
					</Text>
				</Flex>
			</Flex>
			<Flex justifyContent={"end"} flexDir={"column"}>
				<Text
					mb={"1rem"}
					color={"#171923"}
					fontSize={"1.125rem"}
					fontWeight={"600"}
				>
					Resumo do investimento{" "}
				</Text>
				<Flex
					flexDir={"column"}
					border={"1px solid #f0f0f0"}
					borderRadius={"0.75rem"}
					w={"max"}
				>
					<Img
						w={"21.6875rem"}
						h={"12.75rem"}
						src={`/api/file/${imovel?.pictures_enterprise[0]}`}
						borderRadius={"0.75rem"}
					/>
					<Flex
						w={"100%"}
						justifyContent={"space-between"}
						px={"1rem"}
						py={"0.75rem"}
					>
						<Flex flexDir={"column"}>
							<Text
								fontSize={"1rem"}
								fontWeight={"500"}
								color={"#171923"}
								mb={"0.1875rem"}
							>
								{imovel?.name}
							</Text>
							<Text
								fontSize={"0.75rem"}
								fontWeight={"400"}
								color={"#2D3748"}
								mb={"0.75rem"}
							>
								{imovel?.enterprise_type}
							</Text>
							<Text fontSize={"0.75rem"} fontWeight={"400"} color={"#2D3748"}>
								Cotas adquiridas: {cotas}
							</Text>
						</Flex>
						<Flex flexDir={"column"}>
							<Text
								fontSize={"1rem"}
								fontWeight={"500"}
								color={"#171923"}
								mb={"0.1875rem"}
							>
								{formatCurrency(imovel?.min_investment)}
							</Text>
							<Text
								fontSize={"0.75rem"}
								fontWeight={"400"}
								color={"#2D3748"}
								mb={"0.75rem"}
							>
								Preço unitário{" "}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
