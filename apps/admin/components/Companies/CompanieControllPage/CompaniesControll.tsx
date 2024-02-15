import React, { useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { CompaniesCard } from "./CompaniesCard";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";
import { useCreateCompany } from "../../../hooks/useCreateCompany";
import { fetchEnterprise } from "services";
import { useQuery, useQueryClient } from "react-query";
import { PersistentFramework } from "ui";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const CompaniesControll: React.FC = () => {
	const { setIsCreatePage, setFirstStep } = useCreateAdminCreateSteps();
	const {
		setIsEditing,
		setIsCreating,
		deleteAllDataFromStateCompanyForm,
		companyFormData,
		haveCompanyCreateInProcess,
		handleHasCompanyBeingCreated,
		setMembers,
	} = useCreateCompany();
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery(
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
							{data?.enterprises?.length} de{" "}
							{data?.enterprises?.length * data?.totalPages} resultados
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
								handleHasCompanyBeingCreated(true);
								setMembers([{ image: null, name: "", position: "" }]);
								PersistentFramework.remove("formData");
								deleteAllDataFromStateCompanyForm();
							}}
							isDisabled={haveCompanyCreateInProcess ? true : false}
						>
							Criar empresa
						</Button>
					</Flex>
				</Flex>
				{haveCompanyCreateInProcess && (
					<CompaniesCard
						logo={companyFormData?.enterprise_logo}
						nome={companyFormData?.enterprise_name}
						opAvailable={companyFormData?.enterprise_info?.in_progress}
						opFinished={companyFormData?.enterprise_info?.delivered_enterprises}
						receita={0}
						isFinisished={false}
					/>
				)}
				{!isLoading &&
					data?.enterprises?.map((data, index) => (
						<CompaniesCard
							key={index}
							id={data?._id}
							logo={`${url}/file/${data?.enterprise_logo}`}
							nome={data?.enterprise_name}
							opAvailable={data?.enterprise_info?.in_progress}
							opFinished={data?.enterprise_info?.delivered_enterprises}
							receita={0}
							isFinisished={true}
						/>
					))}
				<Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
					<Button
						bgColor={"#718096"}
						borderRadius={"6.25rem"}
						p="0.75rem"
						isDisabled={currentPage === 1}
						onClick={handlePreviousPageClick}
						transition={"0.3s"}
						_hover={{ opacity: 0.7, cursor: "pointer" }}
					>
						<Img src={"/logos/leftArrow.svg"} />
					</Button>
					{pageNumbers.map((pageNumber) => (
						<Button
							key={pageNumber}
							bgColor={"transparent"}
							borderRadius={"6.25rem"}
							p="0.75rem"
							fontWeight={pageNumber === currentPage ? "600" : "normal"}
							color={pageNumber === currentPage ? "#1A202C" : "#A0AEC0"}
							onClick={() => setCurrentPage(pageNumber)}
							transition={"0.3s"}
							_hover={{ opacity: 0.7, cursor: "pointer" }}
						>
							{pageNumber}
						</Button>
					))}
					<Button
						bgColor={"#718096"}
						borderRadius={"6.25rem"}
						p="0.75rem"
						onClick={handleNextPageClick}
						isDisabled={!hasNextPage}
						transition={"0.3s"}
						_hover={{ opacity: 0.7, cursor: "pointer" }}
					>
						<Img src={"/logos/rightArrow.svg"} />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
