import React from "react";
import { Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui";

interface IGeneralPanelInfoCards {
	cardsData: unknown;
}

export const GeneralPanelInfoCards: React.FC<IGeneralPanelInfoCards> = ({
	cardsData,
}) => {
	const cards = [
		{
			id: 1,
			logo: "/logos/receitas.svg",
			title: "Receitas Vestar",
			value: formatCurrency(cardsData?.revenue),
		},
		{
			id: 2,
			logo: "/logos/bagpack.svg",
			title: "Empresas",
			value: cardsData?.num_enterprises,
		},
		{
			id: 3,
			logo: "/logos/cotistas.svg",
			title: "Cotistas",
			value: cardsData?.num_stakeholders,
		},
		{
			id: 4,
			logo: "/logos/oportunidades-logo-generalpanel.svg",
			title: "Oportunidades",
			value: cardsData?.num_opportunities,
		},
	];

	return (
		<>
			{cards?.map((data) => (
				<Flex
					key={data.id}
					bgColor={"#1789A3"}
					px={"1.5rem"}
					py={"1rem"}
					gap={"1.5rem"}
					borderRadius={"1.25rem"}
					alignItems={"center"}
				>
					<Img src={data.logo} />
					<Flex flexDir={"column"}>
						<Flex gap={"0.5rem"}>
							<Text fontSize={"0.875rem"} fontWeight={"500"} color={"#fff"}>
								{data.title}
							</Text>
							<Img src={"/logos/info.svg"} />
						</Flex>
						<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#fff"}>
							{data.value}
						</Text>
					</Flex>
				</Flex>
			))}
		</>
	);
};
