import { Button, Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { ImoveisTableRow } from "./Row";
// import { InvestmentDetailsModal } from "../Modal/InvestmentDetailsModal";
import { ImoveisTableHeader } from "./ImoveisTableHeader";
import { InvestmentModel } from "../../../dtos/IInvestment";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";

interface IImoveisTable {
	data: InvestmentModel[];
	token: string;
	isMoreThenOnePage?: boolean;
	buttonState?: string;
	setFilter?: unknown;
}
const MotionFlex = motion(Flex);

const ImoveisTable: FunctionComponent<IImoveisTable> = ({ data, token }) => {
	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"0.75rem"}>
			<ImoveisTableHeader />
			<MotionFlex initial="hidden" animate="visible">
				<ImoveisTableRow
					modalOpen={null}
					cota_price={null}
					enterprise_type={"Residencial"}
					expected_delivery_date={"Jun 2026"}
					expected_rentability={null}
					final_invoice={null}
					investor_id={null}
					last_invoice_paid={null}
					name={"XR Plaza"}
					next_invoice={null}
					num_cotas={"1125"}
					num_installments={null}
					opportunity_id={null}
					opportunity_url={null}
					paid_installments={null}
					profitability={120}
					return_realized={null}
					status={"Concluded"}
					total_invested={225000.0}
					setEmpreendimento={null}
					pictures_enterprise={null}
					document_key={null}
					url_unsigned_document={null}
					token={token}
					contributionId={null}
					dataInvest={"15 Jan 2024"}
					percentageInvestment={100}
					documentKey={null}
					_id={null}
				/>
			</MotionFlex>
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

			{/* <InvestmentDetailsModal
				data={empreendimento}
				isOpen={isOpen}
				onClose={onClose}
			/> */}
		</Flex>
	);
};

export default ImoveisTable;
