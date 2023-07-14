import React, { FunctionComponent, useState } from "react";
import { Flex, Text, Img, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const MotionFlex = motion(Flex);

const MarketStudyComponent: FunctionComponent = ({}) => {
	const filesPerPage = 4;
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
				<Text mb="2rem" fontWeight={"600"} fontSize="2xl" color={"#171923"}>
					Estudos de mercado
				</Text>
				<Button
					h={"max"}
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
			<Flex flexDir={"column"} gap="5">
				{currentFiles.map((file, index) => (
					<MotionFlex
						key={index}
						alignItems={"center"}
						gap={"1.5rem"}
						bgColor={"#F7FAFC"}
						p={"1rem"}
						borderRadius={"1rem"}
						w={"40.8125rem"}
						initial="hidden"
						animate="visible"
						variants={pageTransition}
					>
						<Img src={file.icon} />
						<Text
							w={"32.3125rem"}
							fontSize={"0.875rem"}
							color={"#171923"}
							fontWeight={"400"}
						>
							{file.name}
						</Text>
						<Img src={file.downloadIcon} />
					</MotionFlex>
				))}
			</Flex>
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
		</Flex>
	);
};

export const MarketStudy: FunctionComponent = () => {
	return <MarketStudyComponent />;
};
