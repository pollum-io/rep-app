import React, { FunctionComponent } from "react";
import { Flex, Button } from "@chakra-ui/react";

interface IOportunitiesNavBar {
	page?: string;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}

export const OportunitiesNavBar: FunctionComponent<IOportunitiesNavBar> = ({
	page,
	setPage,
}) => {
	return (
		<Flex w="70rem" h="100%" gap={"4"} justifyContent="start" mt={"2rem"}>
			<Button
				bg={page === "oportunidade" ? "#003243c8" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "oportunidade" ? "#fff" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				transition="0.6s"
				_hover={{ opacity: 0.6 }}
				onClick={() => setPage("oportunidade")}
			>
				Oportunidade
			</Button>
			<Button
				bg={page === "detalhamento" ? "#003243c8" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "detalhamento" ? "#fff" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ opacity: 0.6 }}
				onClick={() => setPage("detalhamento")}
			>
				Detalhamento técnico
			</Button>
			<Button
				bg={page === "aportes" ? "#003243c8" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "aportes" ? "#fff" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ opacity: 0.6 }}
				onClick={() => setPage("aportes")}
			>
				Aportes
			</Button>
			<Button
				bg={page === "visao geral" ? "#003243c8" : "transparent"}
				fontSize={"0.875rem"}
				fontWeight={"500"}
				color={page === "visao geral" ? "#fff" : "#718096"}
				borderRadius={"1rem"}
				w={"max"}
				h={"max"}
				py={"2"}
				px={"4"}
				_hover={{ opacity: 0.6 }}
				onClick={() => setPage("visao geral")}
			>
				Visão geral
			</Button>
		</Flex>
	);
};
