import React, { useMemo, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import EmpreendimentoTable from "./Table";
import { IContribution } from "ui";

type ComponentProps = {
	contribution: IContribution;
};

export const EmpreendimentoComponent: React.FC<ComponentProps> = ({
	contribution,
}) => {
	const [state, setState] = useState("abertas");
	const [filteredArray, setFilteredArray] = useState<any[]>([]);

	const setFilter = useMemo(() => {
		const newArray =
			state === "pagas"
				? contribution?.contributions?.filter(
						(contr) => contr?.status === "RECEIVED"
				  )
				: contribution?.contributions?.filter(
						(contr) => contr?.status !== "RECEIVED"
				  );
		setFilteredArray(newArray);
	}, [contribution?.contributions, state]);

	console.log(contribution);
	return (
		<>
			<Flex gap={"1rem"} mt={"2rem"} mb={"1.5rem"}>
				<Button
					borderRadius={"624.9375rem"}
					px={"0.75rem"}
					py={"0.5rem"}
					color={state === "abertas" ? "#00262D" : "#718096"}
					bgColor={state === "abertas" ? "#B1D8DF" : "transparent"}
					fontWeight={"500"}
					onClick={() => {
						setState("abertas");
						setFilter;
					}}
					_hover={{ opacity: 0.7 }}
				>
					Abertas
				</Button>
				<Button
					borderRadius={"624.9375rem"}
					px={"0.75rem"}
					py={"0.5rem"}
					color={state === "pagas" ? "#00262D" : "#718096"}
					bgColor={state === "pagas" ? "#B1D8DF" : "transparent"}
					fontWeight={"500"}
					onClick={() => {
						setState("pagas");
						setFilter;
					}}
					_hover={{ opacity: 0.7 }}
				>
					Pagas{" "}
				</Button>
			</Flex>
			<Flex w={"100%"} flexDir={"column"}>
				<Flex
					id="table-header"
					bg={"transparent"}
					px="1rem"
					py={"0.75rem"}
					justifyContent="space-between"
					alignItems="center"
					borderTopRadius="0.75rem"
					color={"#171923"}
				>
					<Flex flex="1">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Empreendimento
						</Text>
					</Flex>
					<Flex flex="0.4">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Parcela
						</Text>
					</Flex>
					<Flex flex="0.5">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Vencimento
						</Text>
					</Flex>
					<Flex flex="0.5">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Valor
						</Text>
					</Flex>
					<Flex flex="0.8">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Status
						</Text>
					</Flex>
					<Flex flex="0.5">
						<Text fontSize={"0.875rem"} fontWeight={"500"}>
							Arquivos
						</Text>
					</Flex>
				</Flex>
				{filteredArray?.map((cnt) => (
					<EmpreendimentoTable
						key={cnt?._id}
						id={cnt?._id}
						name={cnt?.opportunity_name}
						type={cnt?.opportunity_type}
						status={cnt?.status}
						value={cnt?.amount}
						date={cnt?.due_date}
						numInstallments={cnt?.num_installments}
						numPaidInstallments={cnt?.paid_installments}
						comprovante={cnt?.invoice_url}
					/>
				))}
			</Flex>
		</>
	);
};
