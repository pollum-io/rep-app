import React, { useEffect } from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { Oval } from "react-loader-spinner";
import { useRegisterSteps } from "../../../hooks";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useOpportunities } from "../../../hooks/useOpportunities";

interface IContractSign {
	imovel?: IOpportunitiesCard;
}

export const InvestContractSign: React.FC<IContractSign> = ({ imovel }) => {
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { cotas } = useOpportunities();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setFirstStep(false);
			setSecondStep(false);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [setFirstStep, setSecondStep]);

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
