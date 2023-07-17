import React, { FunctionComponent } from "react";
import { Flex, Text, Progress, Img } from "@chakra-ui/react";

import { IMoreAbout } from "../../dtos/IMoreAbout";

const MoreAboutComponent: FunctionComponent<IMoreAbout> = ({
	icon,
	title,
	description,
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
		>
			<Flex flexDir={"column"} w="14.4rem" align={"center"}>
				<Img src={icon} w={"3rem"} pb={"1rem"} />
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
					textAlign={"center"}
					w="100%"
					h={"3.75rem"}
					color={"#171923"}
					fontSize={"0.875rem"}
				>
					{description}
				</Text>
			</Flex>
		</Flex>
	);
};

export const MoreAbout: FunctionComponent = () => {
	return (
		<Flex gap={"1.5rem"} justifyContent={"center"}>
			<MoreAboutComponent
				icon="/icons/description.svg"
				title="Descrição completa"
				description="Veja o detalhamento técnico do empreendimento"
			/>
			<MoreAboutComponent
				icon="/icons/opt-resume.svg"
				title="Resumo da oportunidade"
				description="Retorno, riscos e condições"
			/>
			<MoreAboutComponent
				icon="/icons/geral.svg"
				title="Visão geral"
				description="Veja o detalhamento da estrutura de negócio com previsões financeiras"
			/>
		</Flex>
	);
};
