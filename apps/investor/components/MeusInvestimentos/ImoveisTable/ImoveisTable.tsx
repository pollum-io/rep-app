import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { ImoveisTableRow } from "./Row";
import { InvestmentDetailsModal } from "../Modal/InvestmentDetailsModal";
import { ImoveisTableHeader } from "./ImoveisTableHeader";
import { InvestmentModel } from "../../../dtos/IInvestment";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { fetchInvestmentByUser } from "../../../services/fetchInvestmentByUser";

interface IImoveisTable {
	data: InvestmentModel[];
	token: string;
	isMoreThenOnePage: boolean;
}
const MotionFlex = motion(Flex);

const ImoveisTable: FunctionComponent<IImoveisTable> = ({
	data,
	token,
	isMoreThenOnePage,
}) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [empreendimento, setEmpreendimento] = useState<InvestmentModel | null>(
		null
	);
	const [currentPage, setCurrentPage] = useState(1);
	const filesPerPage = 10; // Declare a variável filesPerPage antes de usá-la

	const totalPages = Math.ceil(data?.length / filesPerPage);

	const [state, setState] = useState<any>(data);

	const nextPage = async () => {
		setCurrentPage((prevPage) => prevPage + 1);
		await fetchInvestmentByUser(token, currentPage + 1).then((response) => {
			setState(response?.data?.investments);
		});
	};

	const prevPage = async () => {
		setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
		await fetchInvestmentByUser(token, currentPage - 1).then((response) => {
			setState(response?.data?.investments);
		});
	};
	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"0.75rem"}>
			<ImoveisTableHeader />
			{state?.map((data, index) => (
				<MotionFlex initial="hidden" animate="visible" key={index}>
					<ImoveisTableRow
						modalOpen={onOpen}
						cota_price={data?.cota_price}
						enterprise_type={data?.enterprise_type}
						expected_delivery_date={data?.expected_delivery_date}
						expected_rentability={data?.expected_rentability}
						final_invoice={data?.final_invoice}
						investor_id={data?.investor_id}
						last_invoice_paid={data?.last_invoice_paid}
						name={data?.name}
						next_invoice={data?.next_invoice}
						num_cotas={data?.num_cotas}
						num_installments={data?.num_installments}
						opportunity_id={data?.opportunity_id}
						opportunity_url={data?.opportunity_url}
						paid_installments={data?.paid_installments}
						profitability={data?.profitability}
						return_realized={data?.return_realized}
						status={data?.status}
						total_invested={data?.total_invested}
						setEmpreendimento={setEmpreendimento}
						pictures_enterprise={data?.pictures_enterprise}
						document_key={data?.document_key}
						url_unsigned_document={data?.url_unsigned_document}
						token={token}
						contributionId={data?.contribution}
						dataInvest={data?.createdAt}
						percentageInvestment={data?.percentage_of_investment}
						documentKey={data?.document_key}
					/>
				</MotionFlex>
			))}
			{data && isMoreThenOnePage && (
				<Flex gap={"1.5rem"} mt="2rem" justifyContent={"center"}>
					<Button
						bgColor="#2D3748"
						onClick={prevPage}
						borderRadius="2rem"
						isDisabled={currentPage === 1}
						w="max"
						transition="opacity 0.3s"
						px={"1.25rem"}
						py={"0.5rem"}
						h="max"
						color={"#FFF"}
						fontSize={"0.875rem"}
						fontWeight={"400"}
						gap={"0.5rem"}
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
						onClick={nextPage}
						transition="opacity 0.3s"
						color={"#FFF"}
						fontSize={"0.875rem"}
						fontWeight={"400"}
						gap={"0.5rem"}
						isDisabled={currentPage === totalPages || state.length < 10}
					>
						Próxima
						<AiOutlineArrowRight color="#FFF" />
					</Button>
				</Flex>
			)}

			<InvestmentDetailsModal
				data={empreendimento}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Flex>
	);
};

export default ImoveisTable;
