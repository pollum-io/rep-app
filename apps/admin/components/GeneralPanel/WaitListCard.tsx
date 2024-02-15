import React, { useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { fetchGetContact } from "services";

export const WaitListCard: React.FC = () => {
	// const [copied, setCopied] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const queryClient = useQueryClient();

	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
		// .then(() => {
		// 	setCopied(true);
		// 	setTimeout(() => {
		// 		setCopied(false);
		// 	}, 500);
		// });
	};

	const { data, isLoading } = useQuery(
		["enterpriseShareholdersFilter"],
		async () => await fetchGetContact(currentPage)
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
		<Flex
			w={"40.75rem"}
			bgColor={"#fff"}
			borderRadius={"1.25rem"}
			p={"1rem"}
			gap={"1.5rem"}
			flexDir={"column"}
		>
			<Flex alignItems={"center"} w={"100%"} justifyContent={"space-between"}>
				<Text color={"#171923"} fontSize={"1.125rem"} fontWeight={"500"}>
					Waitlist
				</Text>
				<Flex alignItems={"center"} gap={"0.75rem"}>
					<Text color={"#2D3748"} fontSize={"0.75rem"}>
						{data?.contact?.length} de{" "}
						{data?.contact?.length * data?.totalPages} resultados
					</Text>
					<Button
						px={"0.5rem"}
						py="0.625rem"
						border={"1px solid #007D99"}
						bgColor={"transparent"}
						fontWeight={"400"}
						color={"#007D99"}
						borderRadius={"3.0625rem"}
						h={"1.5rem"}
						fontSize={"0.75rem"}
					>
						Ver todos
					</Button>{" "}
				</Flex>
			</Flex>
			{data?.contact?.map((data) => (
				<Flex
					key={data?._id}
					border={"1px solid #EDF2F7"}
					px={"0.75rem"}
					py={"0.5rem"}
					gap={"1rem"}
					alignItems={"center"}
					borderRadius={"0.75rem"}
				>
					<Flex
						flexDir={"column"}
						w={"11.25rem"}
						overflow={"hidden"}
						textOverflow={"ellipsis"}
					>
						<Text
							textOverflow={"ellipsis"}
							whiteSpace={"nowrap"}
							overflow={"hidden"}
							maxWidth={"11.25rem"}
							color={"#171923"}
							fontSize={"0.75rem"}
							fontWeight={"500"}
						>
							{data?.name}
						</Text>
						<Text
							textOverflow={"ellipsis"}
							whiteSpace={"nowrap"}
							overflow={"hidden"}
							maxWidth={"11.25rem"}
							color={"#2D3748"}
							fontSize={"0.75rem"}
						>
							{data?.email}
						</Text>
					</Flex>
					<Img
						pl={"0.25rem"}
						transition={"0.5s"}
						_hover={{ cursor: "pointer", opacity: 0.6 }}
						src="/logos/copy.svg"
						onClick={() => handleCopy(`${data?.name} - ${data?.email}`)}
					/>
					<Flex w={"8.125rem"}>
						<Text
							textOverflow={"ellipsis"}
							whiteSpace={"nowrap"}
							overflow={"hidden"}
							maxWidth={"8.125rem"}
							color={"#2D3748"}
							fontSize={"0.75rem"}
						>
							{data?.phone_contact}
						</Text>
					</Flex>
					<Img
						transition={"0.5s"}
						_hover={{ cursor: "pointer", opacity: 0.6 }}
						src="/logos/copy.svg"
						onClick={() => handleCopy(data?.phone_contact)}
					/>
					<Flex w={"6.3125rem"}>
						<Text color={"#2D3748"} fontSize={"0.75rem"}>
							{data?.country}
						</Text>
					</Flex>
					<Flex>
						<Text
							py={"0.625rem"}
							px={"0.5rem"}
							fontWeight={"500"}
							color={"#007D99"}
							fontSize={"0.75rem"}
						>
							Aprovar
						</Text>
					</Flex>
				</Flex>
			))}
			<Flex justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
				<Button
					bgColor={"#718096"}
					borderRadius={"6.25rem"}
					p="0.75rem"
					isDisabled={currentPage === 1}
					onClick={handlePreviousPageClick}
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
				>
					<Img src={"/logos/rightArrow.svg"} />
				</Button>
			</Flex>
		</Flex>
	);
};
