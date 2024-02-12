import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { formatCurrency } from "ui";

interface IOpportuntiesInfoCards {
	cardsData: unknown;
}

export const OpportuntiesInfoCards: React.FC<IOpportuntiesInfoCards> = ({
	cardsData,
}) => {
	const cards = [
		{
			id: 1,
			logo: "/logos/oportunidades-logo-generalpanel.svg",
			title: "Oportunidades",
			value: 1,
		},
		{
			id: 2,
			logo: "/logos/assinatura-pendente.svg",
			title: "Assinaturas pendentes",
			value: 2,
		},
		{
			id: 3,
			logo: "/logos/cotistas.svg",
			title: "Cotistas",
			value: 3,
		},
		{
			id: 4,
			logo: "/logos/bagpack.svg",
			title: "Empresas",
			value: 4,
		},
	];

	return (
		<>
			{cards?.map((data) => (
				<Flex
					key={data.id}
					bgColor={"#FFF"}
					px={"1.5rem"}
					py={"1rem"}
					gap={"1.5rem"}
					borderRadius={"1.25rem"}
					alignItems={"center"}
					boxShadow={"14px 17px 40px 4px rgba(112, 144, 176, 0.08);"}
				>
					<Img src={data.logo} />
					<Flex flexDir={"column"}>
						<Flex gap={"0.5rem"}>
							<Text fontSize={"0.875rem"} fontWeight={"500"} color={"#2D3748"}>
								{data.title}
							</Text>
							<Img src={"/logos/info.svg"} />
						</Flex>
						<Text fontSize={"1.125rem"} fontWeight={"600"} color={"#171923"}>
							{data.value}
						</Text>
					</Flex>
				</Flex>
			))}
		</>
	);
};
