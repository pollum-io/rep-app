import React, { FunctionComponent, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";

interface IOportunitiesNavBar {
	page?: string;
	setPage?: React.Dispatch<React.SetStateAction<string>>;
}

export const OportunitiesNavBar: FunctionComponent<IOportunitiesNavBar> = ({
	page,
	setPage,
}) => {
	return (
		<Flex w="70rem" h="100%" gap={"4"} justifyContent="start" mt={"2rem"}>
			<Button
				bg={page === "oportunidade" ? "#B1D8DF" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "oportunidade" ? "#00262D" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ color: "#007D99" }}
				onClick={() => setPage("oportunidade")}
			>
				Oportunidade
			</Button>
			<Button
				bg={page === "detalhamento" ? "#B1D8DF" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "detalhamento" ? "#00262D" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ color: "#007D99" }}
				onClick={() => setPage("detalhamento")}
			>
				Detalhamento
			</Button>
			<Button
				bg={page === "resumo" ? "#B1D8DF" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "resumo" ? "#00262D" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ color: "#007D99" }}
				onClick={() => setPage("resumo")}
			>
				Resumo
			</Button>
			<Button
				bg={page === "visao geral" ? "#B1D8DF" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "visao geral" ? "#00262D" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ color: "#007D99" }}
				onClick={() => setPage("visao geral")}
			>
				Visão geral
			</Button>
		</Flex>
	);
};
