import { FunctionComponent, useState } from "react";
import { Flex, Text, Img, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type FileData = {
	file?: string;
	name?: string;
};
interface IDocs {
	title?: string;
	isInvestPage?: boolean;
	width?: string;
	data?: FileData[];
}

const MotionFlex = motion(Flex);

export const DocsComponent: FunctionComponent<IDocs> = ({
	title,
	isInvestPage,
	width,
	data,
}) => {
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
	const currentFiles = data?.slice(indexOfFirstFile, indexOfLastFile);
	const totalPages = Math?.ceil(totalFiles / filesPerPage);
	const pageTransition = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};
	return (
		<Flex flexDir={"column"} width={width} mr={"3.4rem"}>
			{!isInvestPage && (
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
						border="1px solid #003243c8"
						fontWeight={"500"}
						color={"#003243c8"}
					>
						Baixar todas
					</Button>
				</Flex>
			)}
			<Flex flexDir={"column"} gap="0.5rem">
				{currentFiles?.map((data, index) => (
					<MotionFlex
						key={index}
						alignItems={"center"}
						bgColor={"#29535f1c"}
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
							<Img src={"/icons/folder.svg"} />
							<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"400"}>
								{data?.name}
							</Text>
						</Flex>
						<Img src={"/icons/downloand.svg"} />
					</MotionFlex>
				))}
			</Flex>
			{data && data?.length > 5 && (
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
