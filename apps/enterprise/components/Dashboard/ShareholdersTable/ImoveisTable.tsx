import { Button, Flex } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { ShareholdersTableRow } from "./ShareholdersTableRow";
import { ShareholdersTableHeader } from "./ShareholdersTableHeader";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion"; // Importe o motion e o AnimatePresence
import { useQueryClient } from "react-query";
import { Oval } from "react-loader-spinner";

interface IImoveisTable {
	enterpriseId: string;
	token: string;
	isMoreThenOnePage?: boolean;
	buttonState?: string;
	setFilter?: any;
	dataShare?: any;
	isLoading?: any;
	error?: any;
	currentPage?: number;
	setCurrentPage?: any;
}
const MotionFlex = motion(Flex);

const ShareholdersTable: FunctionComponent<IImoveisTable> = ({
	token,
	dataShare,
	enterpriseId,
	isLoading,
	error,
	currentPage,
	setCurrentPage,
}) => {
	const queryClient = useQueryClient();
	const totalPages = dataShare?.totalPages;

	const handleNextPageClick = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
			const queryKey = ["enterpriseShareholders", enterpriseId, currentPage];
			queryClient.invalidateQueries(queryKey);
		}
	};

	const handlePreviousPageClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			const queryKey = ["enterpriseShareholders", enterpriseId, currentPage];
			queryClient.invalidateQueries(queryKey);
		}
	};
	const hasNextPage = !isLoading && currentPage < totalPages - 1;
	console.log(dataShare);
	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"9.75rem"}>
			<ShareholdersTableHeader />
			<AnimatePresence initial={false} mode="wait">
				{!isLoading && dataShare?.shareholders && (
					<motion.div
						key={currentPage}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						{isLoading || error ? (
							<Flex
								w={"100%"}
								h={"100%"}
								justifyContent={"center"}
								py={"15rem"}
							>
								<Oval
									height={85}
									width={85}
									color="#1789A3"
									wrapperStyle={{}}
									wrapperClass=""
									visible={true}
									ariaLabel="oval-loading"
									secondaryColor="#bdbdbd"
									strokeWidth={2}
									strokeWidthSecondary={2}
								/>
							</Flex>
						) : (
							dataShare?.shareholders?.map((data, index) => (
								<MotionFlex initial="hidden" animate="visible" key={index}>
									<ShareholdersTableRow
										oportunityImage={data?.opportunity?.images[0]}
										oportunityName={data?.opportunity?.name}
										oportunityType={data?.opportunity?.enterprise_type}
										oportunityUrl={data?.opportunity?.url}
										investorName={data?.investor?.name}
										investorCpf={data?.investor?.cpf}
										documentKey={data?.investment?.document_key}
										totalInvested={
											data?.investment?.cota_price * data?.investment?.num_cotas
										}
										cotas={data?.investment?.num_cotas}
										totalPaid={data?.investment?.totalPaid}
										paidInstallments={data?.investment?.paid_installments}
										unpaidInstallments={data?.investment?.unpaid_installments}
										numberOfInstallments={data?.investment?.num_installments}
										status={data?.investment?.status}
										token={token}
									/>
								</MotionFlex>
							))
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{dataShare?.shareholders && (
				<Flex gap={"1.5rem"} mt="2rem" justifyContent={"center"}>
					<Button
						bgColor="#2D3748"
						borderRadius="2rem"
						w="max"
						transition="opacity 0.3s"
						px={"1.25rem"}
						py={"0.5rem"}
						h="max"
						color={"#FFF"}
						fontSize={"0.875rem"}
						fontWeight={"400"}
						gap={"0.5rem"}
						isDisabled={currentPage === 1}
						onClick={handlePreviousPageClick}
					>
						<AiOutlineArrowLeft color="#FFF" />
						Anterior
					</Button>
					<Button
						w="max"
						px={"1.25rem"}
						py={"0.5rem"}
						borderRadius="2rem"
						h="max"
						bgColor="#2D3748"
						transition="opacity 0.3s"
						color={"#FFF"}
						fontSize={"0.875rem"}
						fontWeight={"400"}
						gap={"0.5rem"}
						onClick={handleNextPageClick}
						isDisabled={!hasNextPage} // Desabilite o botão se não houver uma próxima página disponível
					>
						Próxima
						<AiOutlineArrowRight color="#FFF" />
					</Button>
				</Flex>
			)}
		</Flex>
	);
};

export default ShareholdersTable;
