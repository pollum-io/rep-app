import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOpportunities } from "../../../../apps/investor/hooks/useOpportunities";

interface IPriceCard {
	id?: string;
	price?: number;
	minted?: number;
	supply?: number;
	oportunitiesAddress?: string;
	investor_pf?: string | null | undefined;
	investor_pj?: string | null | undefined;
	heightDefault?: string;
	pageSize?: string;
}

export const PriceCard: React.FC<IPriceCard> = (props) => {
	const {
		id,
		price,
		minted,
		oportunitiesAddress,
		investor_pf,
		heightDefault,
		pageSize,
	} = props;
	const [isInvestidor] = useState(investor_pf ? true : false);
	const { ended, hasToken } = useOpportunities();
	const { push } = useRouter();
	const [cotas, setCotas] = useState<number>(0);
	const { t } = useTranslation();

	// const formatter = new Intl.NumberFormat("pt-br", {
	// 	style: "currency",
	// 	currency: "BRL",
	// });

	const [containerPosition, setContainerPosition] = useState(false);
	const [scroll, setScrollY] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const breakpoints: Record<string, number[]> = {
				sm: [350, 560, 740, 900],
				md: [350, 560, 740, 900],
				lg: [400, 850, 1100, 1300],
			};

			const topValues: Record<string, string[]> = {
				sm: ["29%", "50%", "75%", "80%"],
				md: ["25%", "50%", "75%", "90%"],
				lg: ["15%", "40%", "65%", "80%"],
			};

			const scrollY = window.scrollY;
			const currentBreakpoints = breakpoints[pageSize || "sm"] || [];
			const currentTopValues = topValues[pageSize || "sm"] || [];

			let containerPosition = false;
			let scrollYValue = "0%";

			for (let i = currentBreakpoints.length - 1; i >= 0; i--) {
				if (scrollY >= currentBreakpoints[i]) {
					containerPosition = true;
					scrollYValue = currentTopValues[i];
					break;
				}
			}

			setContainerPosition(containerPosition);
			setScrollY(scrollYValue);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pageSize]);

	return (
		<Flex
			w="23.125rem"
			h={"max"}
			bgColor={"#007D99"}
			p="1.5rem"
			flexDir={"column"}
			borderRadius="0.75rem"
			position={"absolute"}
			top={containerPosition ? scroll : heightDefault}
			transition="top 1s ease-out"
			boxShadow="0px 20px 25px rgba(31, 41, 55, 0.1), 0px 10px 10px rgba(31, 41, 55, 0.04);"
			color="#ffffff"
		>
			<Text fontSize={"xl"} fontWeight="500">
				{t("opportunitieDetails.priceCard.sharesName")}
			</Text>
			{isInvestidor ? (
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
								onClick={() => setCotas(cotas === 1 ? cotas : cotas + 1)}
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
								valor a definir
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
								onClick={() =>
									push({
										pathname: "/investir",
										query: { id, cotas, oportunitiesAddress },
									})
								}
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
				</Flex>
			) : (
				<Flex
					fontFamily="Poppins"
					fontStyle="normal"
					fontWeight="500"
					fontSize="1rem"
					lineHeight="1.5rem"
					alignItems="center"
					color="#FFFFFF"
					w="100%"
					mt="1rem"
					flexDirection="column"
				>
					<Flex justifyContent="space-between" w="100%">
						<Text>{t("opportunitieDetails.unit")}</Text>
						<Text>{price}</Text>
					</Flex>
					<Flex w="100%" border="1px solid #4BA3B7" my="1rem" />
				</Flex>
			)}
			<Flex flexDir={"column"} gap="0.5rem">
				<Flex
					justifyContent={"space-between"}
					display={isInvestidor ? "flex" : "none"}
				>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.unit")}
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						R${price}
					</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.shares")}
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						{minted}
					</Text>
				</Flex>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"md"} fontWeight="400">
						{t("opportunitieDetails.available")}
					</Text>
					<Text fontSize={"md"} fontWeight="400">
						teste
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
