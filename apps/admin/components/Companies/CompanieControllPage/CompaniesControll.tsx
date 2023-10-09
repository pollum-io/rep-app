import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { CompaniesCard } from "./CompaniesCard";
import { useCreateCompanieSteps } from "../../../hooks/useCreateCompanieSteps";
import { useCreateCompany } from "../../../hooks/useCreateCompany";
import { fetchEnterprise } from "services";
import { useQuery } from "react-query";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const CompaniesControll: React.FC = () => {
	const { setIsCreatePage, setFirstStep } = useCreateCompanieSteps();
	const { setIsEditing, setIsCreating, isNotCretedYet, companyFormData } =
		useCreateCompany();

	const { data, isLoading, error } = useQuery(
		["enterpriseShareholdersFilter"],
		async () => await fetchEnterprise()
	);

	return (
		<Flex flexDir={"column"}>
			<Text
				color={"#007D99"}
				fontSize={"1.5rem"}
				fontWeight={"500"}
				mt={"1rem"}
				mb={"2rem"}
			>
				Empresas
			</Text>
			<Flex
				flexDir={"column"}
				bgColor={"#ffffff"}
				borderRadius={"1.25rem"}
				w={"42.4375rem"}
				p={"1rem"}
				gap={"1.5rem"}
			>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
					<Flex gap={"1rem"} alignItems={"center"}>
						<Img src={"/logos/bagpack.svg"} />
						<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
							Todas as empresas
						</Text>
						<Text color={"#2D3748"} fontSize={"0.75rem"} fontWeight={"400"}>
							6 de 320 resultados
						</Text>
					</Flex>
					<Flex>
						<Button
							color={"#FFF"}
							fontSize={"0.875rem"}
							fontWeight={"500"}
							borderRadius={"6.25rem"}
							bgColor={"#1789A3"}
							px={"0.75rem"}
							py={"0.625rem"}
							w={"9.875rem"}
							h={"2rem"}
							transition={"0.3s"}
							_hover={{ opacity: 0.7, cursor: "pointer" }}
							onClick={() => {
								setIsCreatePage(true);
								setFirstStep(true);
								setIsEditing(false);
								setIsCreating(true);
							}}
							isDisabled={isNotCretedYet ? true : false}
						>
							Criar empresa
						</Button>
					</Flex>
				</Flex>
				<CompaniesCard
					logo={companyFormData?.logo}
					nome={companyFormData?.nome}
					opAvailable={companyFormData?.obrasAndamento}
					opFinished={companyFormData?.obrasEntregues}
					receita={0}
					isFinisished={false}
				/>
				{!isLoading &&
					data?.enterprises?.map((data, index) => (
						<CompaniesCard
							key={index}
							logo={`${url}/file/${data?.enterprise_logo}`}
							nome={data?.enterprise_name}
							opAvailable={data?.opportunities_available}
							opFinished={data?.opportunities_closed}
							receita={0}
							isFinisished={true}
						/>
					))}
				<Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
					<Button bgColor={"#718096"} borderRadius={"6.25rem"} p="0.75rem">
						<Img src={"/logos/leftArrow.svg"} />
					</Button>

					<Button bgColor={"#718096"} borderRadius={"6.25rem"} p="0.75rem">
						<Img src={"/logos/rightArrow.svg"} />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
