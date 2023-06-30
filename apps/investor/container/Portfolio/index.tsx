import {
	Flex,
	Img,
	Radio,
	RadioGroup,
	Stack,
	Text,
	SimpleGrid,
	Checkbox,
	Button,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { BsCheckLg, BsCircleFill } from "react-icons/bs";
import { OpportunitiesCard, OpportunitiesCards } from "../../components";
import { MenuChart } from "../../components/Portfolio/MenuChart";
import { NotInvestWarn } from "../../components/Portfolio/NotInvestWarn";
import { YourDetailtCard } from "../../components/Portfolio/YourDetailCard";
import { DefaultTemplate } from "../DefaultTemplate";
import { Examaple } from "../../components/Portfolio/Chart";

import { useUser } from "../../hooks/useUser";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface IPortfolio {
	portfolioData: string[];
	enterpriseData?: string[];
	enterpriseInvestment?: string[];
	host?: string;
	user?: string;
}

const BarCharts = dynamic(
	async () => {
		const mod = await import("../../components/Portfolio/BarChart");
		return mod.BarCharts;
	},
	{
		ssr: false,
	}
);

const PieChartPortfolio = dynamic(
	async () => {
		const mod = await import("../../components/Portfolio/PieChart");
		return mod.PieChartPortfolio;
	},
	{
		ssr: false,
	}
);

export const PortfolioContainer: FunctionComponent<IPortfolio> = ({
	portfolioData,
	enterpriseData,
	enterpriseInvestment,
	host,
	user,
}) => {
	// const [value, setValue] = useState("1");
	// const [yoursInvestments, setYoursInvestments] = useState<string>();
	// const [hasInvest, setHasInvest] = useState<boolean>(true);
	// const [quotaTimeFilter, setQuotaTimeFilter] = useState("year");
	// const [quotaFilter, setQuotaFilter] = useState("percentage");
	// const [imvestmentFilter, setInvestmentFilter] = useState("processed");
	// const { username, isInvestor, userInfos, setIsInvestor } = useUser();
	// const formattedDate = moment().format("DD/MMM/YY");
	// const { t } = useTranslation();

	// const calcularPorcentagensDeTipos = (objetos: string) => {
	// 	const contagemDeTipos: string = {};
	// 	objetos?.forEach((objeto: string) => {
	// 		const tipo = objeto.enterprise_type;
	// 		if (!contagemDeTipos[tipo]) {
	// 			contagemDeTipos[tipo] = 0;
	// 		}
	// 		contagemDeTipos[tipo]++;
	// 	});

	// 	const totalDeObjetos = objetos?.length;

	// 	const porcentagensDeTipos: string = {};
	// 	Object.entries(contagemDeTipos).forEach(([tipo, contagem]: string) => {
	// 		const porcentagem = (contagem / totalDeObjetos) * 100;
	// 		porcentagensDeTipos[tipo] = porcentagem.toFixed(2);
	// 	});
	// 	setYoursInvestments(porcentagensDeTipos);
	// 	return porcentagensDeTipos;
	// };

	// useEffect(() => {
	// 	calcularPorcentagensDeTipos(portfolioData);
	// 	setIsInvestor(user?.investor_pf ? true : false);
	// }, [portfolioData]);

	return (
		<DefaultTemplate>
			{/* <Flex w="100%">
				<Flex
					bgColor={"#1789A3"}
					alignItems="center"
					borderBottomRadius="0.75rem"
					px="5rem"
					pt="6.8125rem"
					pb="1.5rem"
					w="100%"
					justifyContent="center"
				>
					<Flex w="100%" justifyContent="space-between" maxWidth="70rem">
						<Flex flexDir={"column"} color="white" justifyContent="center">
							<Text fontWeight={"600"} fontSize="3xl">
								{t("portfolio.hello", {
									Name: username,
								})}
							</Text>
							{hasInvest ? (
								<Flex alignItems="center" gap="1">
									<Text fontSize={"sm"} fontWeight="400">
										{t("portfolio.portfolioDateOf")}
									</Text>
									<Text>{formattedDate}</Text>
								</Flex>
							) : (
								<Text fontSize={"sm"} fontWeight="400">
									{t("portfolio.portfolioEmpty")}
								</Text>
							)}
						</Flex>
						<Flex
							position="relative"
							w="34rem"
							h="5.25rem"
							justifyContent="end"
						>
							<YourDetailtCard
								investor={portfolioData}
								enterprise={enterpriseData}
							/>
						</Flex>
					</Flex>
				</Flex>
			</Flex> */}
			{/* <NotInvestWarn /> */}
		</DefaultTemplate>
	);
};
