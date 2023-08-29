import { Flex, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { ImoveisTableRow } from "./Row";
import { InvestmentDetailsModal } from "../Modal/InvestmentDetailsModal";
import { ImoveisTableHeader } from "./ImoveisTableHeader";
import { InvestmentModel } from "../../../dtos/IInvestment";

interface IImoveisTable {
	data: InvestmentModel[];
	token: string;
}

const ImoveisTable: FunctionComponent<IImoveisTable> = ({ data, token }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [empreendimento, setEmpreendimento] = useState<InvestmentModel | null>(
		null
	);

	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"0.75rem"}>
			<ImoveisTableHeader />
			{data.map((data, index) => (
				<ImoveisTableRow
					key={index}
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
					_id={data?._id}
				/>
			))}
			<InvestmentDetailsModal
				data={empreendimento}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Flex>
	);
};

export default ImoveisTable;
