import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui/utils/BRCurrency";
import { useTranslation } from "react-i18next";
import { useRegisterSteps } from "../../../hooks";
import { PersonalDataPF } from "../../EditProfile/PersonalDataPF";
import { UserDataPF } from "../../../dtos/UserPF";
import { UserDataPJ } from "../../../dtos/UserPJ";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { useOpportunities } from "../../../hooks/useOpportunities";
import { useUser } from "../../../hooks/useUser";
import { Oval } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import { fetchGetInvestorPFById, fetchSignContract } from "services";

interface IInvestCheckout {
	imovel?: IOpportunitiesCard;
	isPerfilCompleted?: boolean;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	token: string;
}

export const InvestCheckout: React.FC<IInvestCheckout> = ({
	userDataPF,
	userDataPJ,
	imovel,
	token,
}) => {
	const { t } = useTranslation();
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { cotas, setCotas } = useOpportunities();
	const { setInvestmentId, setDocLink } = useUser();

	const { data, isLoading, isError, error } = useQuery(
		"ïd",
		async () => await fetchGetInvestorPFById(userDataPF?._id, token),
		{
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
			refetchInterval: 3000, // Refetch a cada 5 segundos
		}
	);
	console.log(data?.data);
	const mutation = useMutation(
		async (contractData: any) => {
			try {
				const res = await fetchSignContract(contractData, token);
				return res;
			} catch (error) {
				throw new Error("Erro ao assinar contrato");
			}
		},
		{
			onSuccess: (data) => {
				setDocLink(data?.url);
				setInvestmentId(data?.investment_id);
				setSecondStep(true);
				setFirstStep(false);
			},
		}
	);

	const handleSignContract = () => {
		const contractData = {
			templateKey: imovel?.template_key,
			enterpriseId: imovel?.enterprise_id,
			opportunityId: imovel?._id,
			num_cotas: cotas,
			totalInvested: cotas * (imovel?.min_investment ?? 0),
		};

		mutation.mutate(contractData);
	};
	return (
		<Flex w="100%" gap="5%" justifyContent="space-between" mb="12rem">
			<Flex flexDir={"column"}>
				<Flex>
					<Text
						mb={"1.4688rem"}
						color={"#171923"}
						fontSize={"1.5rem"}
						fontWeight={"600"}
					>
						Resumo do investimento
					</Text>
				</Flex>
				<Flex flexDir={"column"} gap={"1rem"}>
					<Flex w={"41.875rem"}>
						<Flex flex={"2"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Imóvel
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Preço unitário
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"} fontSize={"0.875rem"}>
								Quantidade
							</Text>
						</Flex>
					</Flex>
					<Flex
						alignItems={"center"}
						border={"1px solid #f0f0f0"}
						borderRadius={"0.75rem"}
					>
						<Flex flex={"2"} alignItems={"center"}>
							<Img
								w={"5.6941rem"}
								h={"4.25rem"}
								src={`/api/file/${imovel?.pictures_enterprise[0]}`}
								borderLeftRadius={"0.75rem"}
							/>
							<Flex pl={"1rem"} flexDir={"column"}>
								<Text color={"#171923"} fontWeight={"500"}>
									{imovel?.name}
								</Text>
								<Text color={"#2D3748"} fontSize={"0.75rem"}>
									{imovel?.enterprise_type}
								</Text>
							</Flex>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"}>
								{formatCurrency(imovel?.min_investment)}
							</Text>
						</Flex>
						<Flex flex={"1"}>
							<Text color={"#171923"}>{cotas} cota</Text>
						</Flex>
					</Flex>
				</Flex>
				{!isLoading && data?.data?.is_profile_filled === false && (
					<Flex gap={"1.5rem"} flexDir={"column"}>
						<Text
							mt={"4rem"}
							color={"#171923"}
							fontSize={"1.5rem"}
							fontWeight={"600"}
						>
							Formas de pagamento{" "}
						</Text>
						<Flex
							border={"1px solid #D9D9D9"}
							w={"max"}
							p={"2"}
							borderRadius={"0.5rem"}
						>
							<Img w={"3.1635rem"} h={"1.125rem"} src="images/pixLogo.png" />
						</Flex>
					</Flex>
				)}
				{!isLoading && data?.data?.is_profile_filled === false && (
					<Flex gap={"1.5rem"} flexDir={"column"}>
						<Text
							mt={"4rem"}
							color={"#171923"}
							fontSize={"1.5rem"}
							fontWeight={"600"}
						>
							Complete seu cadastro para continuar{" "}
						</Text>
						<Text color={"#E53E3E"} fontSize={"0.875rem"}>
							Todos os campos abaixo são obrigatórios para realização da compra.
						</Text>
						<Flex>
							<PersonalDataPF
								isCheckout={true}
								userDataPF={userDataPF}
								token={token}
							/>
						</Flex>
					</Flex>
				)}
			</Flex>
			<Flex w="100%" justifyContent={"end"}>
				<Flex
					padding="1.5rem"
					w="23.125rem"
					fontFamily="Poppins"
					h="max-content"
					bg="#007D99"
					boxShadow="0rem 1.25rem 1.5625rem rgba(31, 41, 55, 0.1), 0rem 0.625rem 0.625rem rgba(31, 41, 55, 0.04)"
					borderRadius="0.75rem"
					gap="1rem"
					flexDirection="column"
					color="#FFFFFF"
				>
					<Text fontWeight="500" fontSize="1.25rem">
						{t("wantToInvest.confirmData")}
					</Text>
					<Flex
						bgColor={"#1789A3"}
						py="0.5rem"
						px="1rem"
						borderRadius="0.5rem"
						justifyContent={"space-between"}
						alignItems="center"
					>
						<Flex flexDir={"column"}>
							<Text fontSize={"0.75rem"} fontWeight="500">
								{t("opportunitieDetails.select")}
							</Text>
							<Text fontSize={"0.875rem"} fontWeight="400">
								{t("opportunitieDetails.priceCard.shares", { value: cotas })}
							</Text>
						</Flex>

						<Flex gap="0.3125rem">
							<Img
								_hover={{
									cursor: mutation.isLoading === false ? "pointer" : "default",
									opacity: mutation.isLoading === false ? 0.5 : 0.2,
									transition: "all 0.4s",
								}}
								opacity={mutation.isLoading === false ? "1" : "0.2"}
								src={"/icons/PlusIcon.png"}
								onClick={() =>
									!mutation.isLoading ? setCotas(cotas + 1) : null
								}
							/>
							<Img
								_hover={{
									cursor: mutation.isLoading === false ? "pointer" : "default",
									opacity: mutation.isLoading === false ? 0.5 : 0.2,
									transition: "all 0.4s",
								}}
								opacity={mutation.isLoading === false ? "1" : "0.2"}
								src={"/icons/MinusIcon.png"}
								onClick={() =>
									!mutation.isLoading
										? setCotas(cotas === 0 ? 0 : cotas - 1)
										: null
								}
							/>
						</Flex>
					</Flex>
					<Flex
						justifyContent="space-between"
						fontSize="1rem"
						fontWeight="500"
						mt={"1rem"}
					>
						<Text>Total</Text>
						<Text>{formatCurrency(cotas * (imovel?.min_investment ?? 0))}</Text>
					</Flex>
					<Flex
						mt="1rem"
						flexDirection="column"
						gap="1rem"
						fontFamily="Poppins"
						fontSize="0.875rem"
						lineHeight="1.25rem"
						color="#FFFFFF"
						alignItems={"center"}
					>
						<Button
							justifyContent="center"
							alignItems="center"
							w="100%"
							h="2.5rem"
							bgColor={
								mutation.isLoading === false
									? "#FFFFFF"
									: "rgba(255, 255, 255, 0.80)"
							}
							borderRadius="0.5rem"
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="1rem"
							lineHeight="1.5rem"
							color="#007088"
							_hover={{ bgColor: "#EDF2F7" }}
							_active={{ bgColor: "#E2E8F0" }}
							isDisabled={
								(!isLoading && data?.data?.is_profile_filled === false) ||
								!cotas
							}
							onClick={() => handleSignContract()}
						>
							Confirmar e prosseguir
							{mutation.isLoading && (
								<Flex pl={"0.625rem"}>
									<Oval
										height={18}
										width={18}
										color="#1789A3"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
										ariaLabel="oval-loading"
										secondaryColor="#EDF2F7"
										strokeWidth={4}
										strokeWidthSecondary={4}
									/>
								</Flex>
							)}
						</Button>
						<Text fontWeight={"400"} fontSize={"xs"} display={"flex"}>
							{t("opportunitieDetails.wontBe")}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
