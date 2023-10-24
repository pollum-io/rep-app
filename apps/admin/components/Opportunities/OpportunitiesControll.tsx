import React, { useState } from "react";
import {
	Button,
	Flex,
	Img,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from "@chakra-ui/react";

import { fetchEnterprise } from "services";
import { useQuery, useQueryClient } from "react-query";
import { OpportunitiesCard, PersistentFramework } from "ui";
import { OpportuntiesInfoCards } from "./OpportuntiesInfoCards";
import { useCreateAdminCreateSteps } from "../../hooks/useCreateAdminCreateSteps";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface IOpportunitiesControll {
	token: string;
}

export const OpportunitiesControll: React.FC<IOpportunitiesControll> = ({
	token,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [value, setValue] = useState("1");
	const { setFirstStep, setIsCreatOpportunityePage } =
		useCreateAdminCreateSteps();

	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery(
		["enterpriseShareholdersFilter"],
		async () => await fetchEnterprise()
	);

	const totalPages = data?.totalPages;

	const handleNextPageClick = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
			const queryKey = ["enterpriseShareholders", currentPage];
			queryClient.invalidateQueries(queryKey);
		}
	};

	const handlePreviousPageClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			const queryKey = ["enterpriseShareholders", currentPage];
			queryClient.invalidateQueries(queryKey);
		}
	};

	const hasNextPage = !isLoading && currentPage < totalPages - 1;
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<Flex flexDir={"column"}>
			<Text
				color={"#007D99"}
				fontSize={"1.5rem"}
				fontWeight={"500"}
				mt={"1rem"}
				mb={"2rem"}
			>
				Painel de Oportunidades
			</Text>
			<Flex gap={"2rem"} mb={"2.75rem"}>
				<OpportuntiesInfoCards cardsData={""} />
			</Flex>
			<Flex
				justifyContent={"space-between"}
				alignItems={"center"}
				mb={"1.625rem"}
			>
				<Flex gap={"1rem"} alignItems={"center"}>
					<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
						Todas as oportunidades
					</Text>
					<Text fontSize={"0.75rem"} color={"#2D3748"}>
						12 de 256 resultados
					</Text>
					<Flex>
						<RadioGroup onChange={setValue} value={value}>
							<Stack direction="row">
								<Radio value="1" fontSize={"0.875rem"} color={"#2D3748"}>
									Mostrar encerrados
								</Radio>
							</Stack>
						</RadioGroup>
					</Flex>
				</Flex>
				<Button
					fontWeight={"500"}
					fontSize={"0.875rem"}
					w={"11.0625rem"}
					h={"2rem"}
					borderRadius={"3.0625rem"}
					px={"0.75rem"}
					py={"0.625rem"}
					color={"#fff"}
					bgColor={"#1789A3"}
					onClick={() => {
						setIsCreatOpportunityePage(true);
						setFirstStep(true);
					}}
				>
					Criar oportunidade
				</Button>
			</Flex>
			<Flex flexWrap={"wrap"} gap={"1.125rem"}>
				<OpportunitiesCard isAdmin={true} token={token} />
			</Flex>
		</Flex>
	);
};
