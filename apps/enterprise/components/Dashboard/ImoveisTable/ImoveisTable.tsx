import { Button, Flex } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { ImoveisTableRow } from "./Row";
import { ImoveisTableHeader } from "./ImoveisTableHeader";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { fetchInvestmentByUser } from "services";

interface IImoveisTable {
	data: any[]; //TODO
	token: string;
	isMoreThenOnePage?: boolean;
	buttonState?: string;
	setFilter?: any;
}
const MotionFlex = motion(Flex);

const ImoveisTable: FunctionComponent<IImoveisTable> = ({
	data,
	token,
	isMoreThenOnePage,
	buttonState,
}) => {
	const [empreendimento, setEmpreendimento] = useState<any | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [investmentData, setInvestmentData] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetchInvestmentByUser(token, currentPage);
			setInvestmentData(response?.investments);
			setTotalPages(response?.totalPages);
		};

		fetchData();
	}, [token, currentPage, investmentData]);

	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"0.75rem"}>
			<ImoveisTableHeader />
			{data?.map((data, index) => (
				<MotionFlex initial="hidden" animate="visible" key={index}>
					<ImoveisTableRow
						oportunityImage={data?.opportunity?.images[0]}
						oportunityName={data?.opportunity?.name}
						oportunityType={data?.opportunity?.enterprise_type}
						oportunityUrl={data?.opportunity?.url}
						investorName={data?.investor?.name}
						investorCpf={data?.investor?.cpf}
						totalInvested={
							data?.investment?.cota_price * data?.investment?.num_cotas
						}
						cotas={data?.investment?.num_cotas}
						paidInstallments={data?.investment?.paid_installments}
						numberOfInstallments={data?.investment?.num_installments}
						status={data?.investment?.status}
					/>
				</MotionFlex>
			))}
			{data && (
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
						isDisabled={true}
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
						isDisabled={true}
					>
						Próxima
						<AiOutlineArrowRight color="#FFF" />
					</Button>
				</Flex>
			)}
		</Flex>
	);
};

export default ImoveisTable;
