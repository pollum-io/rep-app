import React, { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Img,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";

import { useQuery } from "react-query";
import { fetchEnterpriseById } from "services";
import { PersistentFramework } from "ui";
import { InputComponent } from "../../Companies/CreateCompanie/CompanieFormCreateInput/InputComponent";

type IFirstOpportunitiesInfo = {
	token: string;
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const FirstOpportunitiesInfo: React.FC<IFirstOpportunitiesInfo> = ({
	token,
}) => {
	return (
		<Flex flexDir={"column"} gap={"1.5rem"}>
			<Flex justifyContent={"space-between"}>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					{/* select */}

					<InputComponent
						type="email"
						width={"18.5rem"}
						name="email"
						label="Nome da oportunidade"
						placeholderText=""
					/>

					<InputComponent
						type="text"
						name="localizacao"
						width={"18.5rem"}
						label="Localização"
						placeholderText=""
					/>
					<InputComponent
						type="text"
						name="cnpj"
						width={"18.5rem"}
						label="Investimento mínimo (R$)"
						placeholderText=""
					/>
					<InputComponent
						type="date"
						name="cnpj"
						width={"18.5rem"}
						label="Início da obra"
						placeholderText=""
					/>
					<InputComponent
						type="date"
						name="cnpj"
						width={"18.5rem"}
						label="Previsão de conclusão"
						placeholderText=""
					/>
				</Flex>
				<Flex flexDir={"column"} gap={"1.5rem"}>
					<InputComponent
						type="number"
						name="enterprise_info.delivered_enterprises"
						width={"18.5rem"}
						label="Rentabilidade esperada"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="enterprise_info.in_progress"
						width={"18.5rem"}
						label="Prazo total do investimento"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="enterprise_info.total_vgv"
						width={"18.5rem"}
						label="Retorno final (%)"
						placeholderText=""
					/>
					<InputComponent
						type="number"
						name="enterprise_info.total_vgv"
						width={"18.5rem"}
						label="Cotas emitidas"
						placeholderText=""
					/>
					{/* select */}
				</Flex>
			</Flex>
			<Flex gap={"1.5rem"} flexDir={"column"} mb={"2.75rem"}>
				<Text fontSize={"0.875rem"} color={"#2D3748"} fontWeight={"500"}>
					Descreva a história, realizações e atual estrutura da empresa
				</Text>
				<Textarea
					placeholder="Insira o texto aqui"
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					name="description"
				/>
			</Flex>
			<Flex gap={"1.5rem"} mb={"10.875rem"}>
				<Button
					borderRadius={"100px"}
					border={"1px solid #007D99"}
					color={"#007D99"}
					bgColor={"transparent"}
					w={"7.5rem"}
					h={"2rem"}
					fontSize={"0.875rem"}
					fontWeight={"500"}
				>
					Voltar
				</Button>
				<Button
					fontSize={"0.875rem"}
					fontWeight={"500"}
					color="white"
					borderRadius={"100px"}
					w={"7.5rem"}
					h={"2rem"}
					bgColor={"#007D99"}
				>
					Avançar
				</Button>
			</Flex>
		</Flex>
	);
};
