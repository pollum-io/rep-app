import { Button, Flex, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOpportunities } from "../../../../apps/investor/hooks/useOpportunities";
import {
	formatCurrency,
	formatCurrencyWithoutSymbol,
} from "../../utils/BRCurrency";
import { ProjectDetailModal } from "../../../../apps/enterprise/components/Oportunities/ProjectDetailModal";
interface IPriceCard {
	url?: string;
	isEnterprise?: boolean;
	heightDefault?: string;
	pageSize?: string;
	unitPrice?: number;
	setFirstStep: any;
	setSecondStep: any;
	setCotas: any;
	cotas: any;
	opportunitiesDetails?: {
		constructed_area: number;
		estimated_vgv: string;
		total_units: number;
		available_units: number;
		average_price: number;
	};
	opportunitiesDetailsToEnteprise?: any;
	token?: string;
}

export const PriceCard: React.FC<IPriceCard> = (props) => {
	const {
		url,
		opportunitiesDetails,
		opportunitiesDetailsToEnteprise,
		isEnterprise,
		unitPrice,
		setFirstStep,
		setSecondStep,
		setCotas,
		cotas,
		token,
	} = props;
	const { ended, hasToken } = useOpportunities();
	const { push } = useRouter();
	const { t } = useTranslation();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const [scrollPosition, setScrollPosition] = useState(0);
	const topMargin = 0; // Altura em pixels onde o PriceCard deve começar a se mover
	const bottomMargin = 0; // Altura em pixels onde o PriceCard deve parar de se mover

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Flex
			w="23.125rem"
			h={"max"}
			bgColor={"#007D99"}
			p="1.5rem"
			flexDir={"column"}
			borderRadius="0.75rem"
			position="sticky"
			top={`${Math.max(topMargin - scrollPosition, 400)}px`}
			marginTop={`${Math.max(bottomMargin - scrollPosition, 0)}px`}
			transition="margin 5.2s ease-out"
			boxShadow="0px 20px 25px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);"
			color="#ffffff"
		>
			<ProjectDetailModal
				opportunitiesDetailsToEnteprise={opportunitiesDetailsToEnteprise}
				isOpen={isOpen}
				onClose={onClose}
				token={token}
			/>
			{!isEnterprise ? (
				<>
					<Text fontSize={"xl"} fontWeight="500">
						{t("opportunitieDetails.priceCard.sharesName")}
					</Text>
					<Flex flexDirection="column">
						<Flex
							my="1rem"
							bgColor={"#1789A3"}
							py="0.5rem"
							px="1rem"
							borderRadius="0.5rem"
							justifyContent={"space-between"}
							alignItems="center"
							display={ended ? "none" : "flex"}
						>
							<Flex flexDir={"column"}>
								<Text fontSize={"xs"} fontWeight="500">
									{t("opportunitieDetails.select")}
								</Text>
								<Text fontSize={"sm"} fontWeight="400">
									{t("opportunitieDetails.priceCard.shares", {
										value: cotas,
									})}
								</Text>
							</Flex>

							<Flex gap="0.3125rem">
								<Img
									_hover={{
										cursor: "pointer",
										opacity: 0.5,
										transition: "all 0.4s",
									}}
									src={"/icons/PlusIcon.png"}
									onClick={() => {
										if (
											opportunitiesDetails &&
											opportunitiesDetails?.available_units > cotas
										) {
											setCotas(cotas + 1);
										}
									}}
								/>
								<Img
									_hover={{
										cursor: "pointer",
										opacity: 0.5,
										transition: "all 0.4s",
									}}
									src={"/icons/MinusIcon.png"}
									onClick={() => setCotas(cotas === 0 ? 0 : cotas - 1)}
								/>
							</Flex>
						</Flex>
						<Flex
							flexDirection={"column"}
							pb="1rem"
							mb="1rem"
							mt={ended ? "1rem" : "none"}
							borderBottom="1px solid #4BA3B7"
						>
							<Flex justifyContent={"space-between"} w="100%">
								<Text fontWeight={ended ? "400" : "500"}>
									{ended
										? hasToken
											? "Você investiu em 12 tokens desta oportunidade. Acompanhe seus rendimentos no portfólio."
											: "Você não comprou cotas desta oportunidade. "
										: t("opportunitieDetails.total")}
								</Text>
								<Text fontWeight={"500"} display={ended ? "none" : "flex"}>
									{formatCurrency(cotas * (unitPrice ?? 0))}
								</Text>
							</Flex>

							<Flex flexDir={"column"} alignItems="center" mt="1rem">
								<Button
									fontWeight={"500"}
									fontSize={"md"}
									bgColor="#FFFFFF"
									color="#007088"
									w="100%"
									px="0.625rem"
									py="1rem"
									mb={ended ? "none" : "1rem"}
									isDisabled={ended && !hasToken}
									_hover={
										ended && !hasToken
											? { opacity: "0.3" }
											: { bgColor: "#F7FAFC" }
									}
									onClick={() => {
										push({
											pathname: "/investir",
											query: { id: url },
										}),
											setFirstStep(true);
										setSecondStep(false);
									}}
								>
									{ended
										? hasToken
											? "Ver tokens adquiridos"
											: "Vendas encerradas"
										: "Quero investir"}
								</Button>
								<Text
									fontWeight={"400"}
									fontSize={"xs"}
									display={ended ? "none" : "flex"}
								>
									{t("opportunitieDetails.wontBe")}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir={"column"} gap="0.5rem">
							<Flex
								justifyContent={"space-between"}
								display={isEnterprise ? "flex" : "none"}
							>
								<Text fontSize={"md"} fontWeight="400">
									{t("opportunitieDetails.unit")}
								</Text>
								<Text fontSize={"md"} fontWeight="400">
									{formatCurrency(unitPrice)}
								</Text>
							</Flex>
							<Flex justifyContent={"space-between"}>
								<Text fontSize={"md"} fontWeight="400">
									{t("opportunitieDetails.shares")}
								</Text>
								<Text fontSize="md" fontWeight="400">
									{(opportunitiesDetails?.total_units ?? 0) -
										(opportunitiesDetails?.available_units ?? 0)}
								</Text>
							</Flex>
							<Flex justifyContent={"space-between"}>
								<Text fontSize={"md"} fontWeight="400">
									{t("opportunitieDetails.available")}
								</Text>
								<Text fontSize={"md"} fontWeight="400">
									{opportunitiesDetails?.available_units}
								</Text>
							</Flex>
						</Flex>
					</Flex>{" "}
				</>
			) : (
				<Flex
					fontFamily="Poppins"
					fontStyle="normal"
					fontSize="1rem"
					alignItems={"start"}
					color="#FFFFFF"
					w="100%"
					flexDirection="column"
				>
					<Flex
						justifyContent="space-between"
						w="100%"
						flexDir={"column"}
						mb={"1rem"}
					>
						<Text fontWeight={"400"}>Total arrecadado</Text>
						<Flex gap={"0.5rem"}>
							<Text fontSize={"1rem"} fontWeight={"400"}>
								R$
							</Text>
							<Text fontSize={"1.25rem"} fontWeight={"500"}>
								{formatCurrencyWithoutSymbol(
									opportunitiesDetailsToEnteprise[0]?.totalRaised
								)}
							</Text>
						</Flex>
					</Flex>
					<Flex
						flexDir={"column"}
						gap="0.5rem"
						justifyContent={"start"}
						w={"100%"}
						mb={"1rem"}
					>
						<Flex justifyContent={"space-between"} w={"100%"}>
							<Text fontSize={"md"} fontWeight="400">
								Cotistas
							</Text>
							<Text fontSize={"md"} fontWeight="400">
								{opportunitiesDetailsToEnteprise[0]?.totalShareholders}
							</Text>
						</Flex>
						<Flex justifyContent={"space-between"}>
							<Text fontSize={"md"} fontWeight="400">
								Cotas emitidas
							</Text>
							<Text fontSize="md" fontWeight="400">
								{opportunitiesDetailsToEnteprise[0]?.totalCotas}
							</Text>
						</Flex>
						<Flex justifyContent={"space-between"}>
							<Text fontSize={"md"} fontWeight="400">
								Previsão de aportes
							</Text>
							<Text fontSize={"md"} fontWeight="400">
								{formatCurrency(
									opportunitiesDetailsToEnteprise[0]?.contributionForecast
								)}
							</Text>
						</Flex>
					</Flex>
					<Button
						bgClip={"#FFF"}
						color={"#007088"}
						h={"2rem"}
						w={"100%"}
						p={"0.625rem"}
						fontWeight={"500"}
						onClick={() => onOpen()}
					>
						Ver detalhamento
					</Button>
				</Flex>
			)}
		</Flex>
	);
};
