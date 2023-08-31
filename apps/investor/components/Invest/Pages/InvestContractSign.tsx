import React, { useEffect, useState } from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";
import { useRegisterSteps } from "../../../hooks";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { useUser } from "../../../hooks/useUser";
import { fetchGetInvestmentById } from "../../../services/fetchGetInvestmentById";
import { FiCheckCircle } from "react-icons/fi";

interface IContractSign {
	imovel?: IOpportunitiesCard;
	token: string;
}

export const InvestContractSign: React.FC<IContractSign> = ({
	imovel,
	token,
}) => {
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { cotas } = useOpportunities();
	const { docLink, investmentId, setContributionId } = useUser();
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false); // Variável que ficará true após 1s

	useEffect(() => {
		if (isConfirmed === true) {
			const timer = setTimeout(() => {
				setShowConfirmation(true);
			}, 1500); // Define o tempo para 1s (1000ms)
			return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
		}
	}, [isConfirmed]);

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

	useEffect(() => {
		const intervalId = setInterval(async () => {
			try {
				const res = await fetchGetInvestmentById(investmentId, token);
				setContributionId(res?.contribution_id);
				setIsConfirmed(false);

				if (res?.status === "PendingPayment") {
					setIsConfirmed(true);
					if (showConfirmation === true) {
						setFirstStep(false);
						setSecondStep(false);
						clearInterval(intervalId);
					}
				}
			} catch (error) {
				console.error("Erro ao buscar investimento:", error);
			}
		}, 5000);
		return () => {
			clearInterval(intervalId);
		};
	}, [
		investmentId,
		setContributionId,
		setFirstStep,
		setSecondStep,
		showConfirmation,
		token,
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
