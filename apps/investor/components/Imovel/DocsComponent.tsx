import React, { FunctionComponent, useState } from "react";
import { Flex, Text, Img, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface IDocs {
	title?: string;
}

const MotionFlex = motion(Flex);

export const DocsComponent: FunctionComponent<IDocs> = ({ title }) => {
	const filesPerPage = 5;
	const totalFiles = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const nextPage = () => {
		const totalPages = Math.ceil(totalFiles / filesPerPage);
		setCurrentPage((prevPage) =>
			prevPage < totalPages ? prevPage + 1 : prevPage
		);
	};

	const prevPage = () => {
		setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
	};

	const indexOfLastFile = currentPage * filesPerPage;
	const indexOfFirstFile = indexOfLastFile - filesPerPage;
	const files = [
		{
			name: "Nome do documento/estudo 1",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 2",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 3",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 4",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 5",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 6",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 7",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 8",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 9",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
		{
			name: "Nome do documento/estudo 10",
			icon: "/icons/folder.svg",
			downloadIcon: "/icons/downloand.svg",
		},
	];
	const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);
	const totalPages = Math.ceil(totalFiles / filesPerPage);
	const pageTransition = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};
	return (
		<Flex flexDir={"column"} maxWidth={"max"} mr={"3.4rem"}>
			<Flex flexDir={"row"} mt="3rem" gap={"16.5rem"}>
				<Text
					w={"max"}
					mb="2rem"
					fontWeight={"600"}
					fontSize="2xl"
					color={"#171923"}
				>
					{title}
				</Text>
				<Button
					h={"max"}
					w={"max"}
					py={"2"}
					px={"6"}
					borderRadius={"0.6rem"}
					bgColor={"transparent"}
					fontSize={"0.875rem"}
					border="1px solid #1789A3"
					fontWeight={"500"}
					color={"#1789A3"}
				>
					Baixar todas
				</Button>
			</Flex>
			<Flex flexDir={"column"} gap="0.5rem">
				{currentFiles.map((file, index) => (
					<MotionFlex
						key={index}
						alignItems={"center"}
						bgColor={"#F7FAFC"}
						px={"1rem"}
						py={"0.5rem"}
						borderRadius={"0.75rem"}
						w={"100%"}
						initial="hidden"
						animate="visible"
						variants={pageTransition}
						justifyContent="space-between"
					>
						<Flex alignItems={"center"} gap={"1.5rem"}>
							<Img src={file.icon} />
							<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"400"}>
								{file.name}
							</Text>
						</Flex>
						<Img src={file.downloadIcon} />
					</MotionFlex>
				))}
			</Flex>
			{files.length > 5 && (
				<Flex gap={"1.5rem"} mt="2rem" justifyContent={"center"}>
					<Button
						bgColor="#2D3748"
						onClick={prevPage}
						borderRadius="2rem"
						isDisabled={currentPage === 1}
						w="max"
						transition="opacity 0.3s"
						p={"3"}
						h="max"
					>
						<AiOutlineArrowLeft color="#FFF" />
					</Button>
					<Button
						w="max"
						p={"3"}
						borderRadius="2rem"
						h="max"
						bgColor="#2D3748"
						onClick={nextPage}
						transition="opacity 0.3s"
						isDisabled={currentPage === totalPages}
					>
						<AiOutlineArrowRight color="#FFF" />
					</Button>
				</Flex>
			)}
		</Flex>
	);
};
