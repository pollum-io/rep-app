import React, { FunctionComponent } from "react";
import { Flex, Text, Img } from "@chakra-ui/react";

import { IMoreAbout } from "../../dtos/IMoreAbout";

const MoreAboutComponent: FunctionComponent<IMoreAbout> = ({
	icon,
	title,
	description,
	onClick,
}) => {
	return (
		<Flex
			bgColor={"#E4F2F3"}
			p={"1rem"}
			flexDir={"column"}
			h={"max"}
			w="max"
			borderRadius={"1rem"}
			transition={"0.5s"}
			_hover={{
				boxShadow:
					"0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);",
			}}
			cursor={"pointer"}
			onClick={onClick}
		>
			<Flex flexDir={"row"} w="20.5rem" align={"center"}>
				<Img src={icon} w={"3rem"} pb={"1rem"} mr={"1rem"} />
				<Flex flexDir={"column"}>
					<Text
						color={"#007D99"}
						fontWeight={600}
						fontSize={"1.125rem"}
						pb={"0.5rem"}
						w="max"
					>
						{title}
					</Text>
					<Text
						textAlign={"left"}
						w="100%"
						h={"3.75rem"}
						color={"#171923"}
						fontSize={"0.875rem"}
					>
						{description}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export const MoreAbout: FunctionComponent<IMoreAbout> = ({ setPage }) => {
	return (
		<Flex gap={"1.5rem"}>
			<MoreAboutComponent
				icon="/icons/description.svg"
				title="Detalhamento técnico"
				description="Veja o detalhamento técnico do empreendimento"
				onClick={() => setPage("detalhamento")}
			/>
			<MoreAboutComponent
				icon="/icons/opt-resume.svg"
				title="Resumo da oportunidade"
				description="Confira o cronograma de aportes, retorno, riscos e condições"
				onClick={() => setPage("aportes")}
			/>
			<MoreAboutComponent
				icon="/icons/geral.svg"
				title="Visão geral"
				description="Veja o detalhamento da estrutura de negócio com previsões financeiras"
				onClick={() => setPage("visao geral")}
			/>
		</Flex>
	);
};
