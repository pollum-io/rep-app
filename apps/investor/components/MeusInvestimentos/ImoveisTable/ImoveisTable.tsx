import { Flex, Text, Button, Img, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { ImoveisTableRow } from "./Row";
import { IEmpreendimentoData } from "../../../dtos/IEmpreendimentoMeuInvestimento";
import { InvestmentDetailsModal } from "../InvestmentDetailsModal";
import { ImoveisTableHeader } from "./ImoveisTableHeader";

const data = [
	{
		empreendimento: "Nome do empreendimento grande pra",
		tipoDoEmpreendiment0: "Tipo do empreendimento",
		inicioInvest: "-",
		cotas: "02 cotas",
		totalInvestido: "R$ 200.000,00",
		porcentagem: "0,2% do portfolio",
		conclusao: "Dez 2026",
		prev: "(previsão)",
		lucratividade: "12%",
		descLucratividade: "ao ano",
		status: "Assinatura pendente",
		acao: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		tipoDoEmpreendiment0: "Tipo do empreendimento",
		inicioInvest: "-",
		cotas: "02 cotas",
		totalInvestido: "R$ 200.000,00",
		porcentagem: "0,2% do portfolio",
		conclusao: "Dez 2026",
		prev: "(previsão)",
		lucratividade: "12%",
		descLucratividade: "ao ano",
		status: "Pagamento pendente",
		acao: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		tipoDoEmpreendiment0: "Tipo do empreendimento",
		inicioInvest: "-",
		cotas: "02 cotas",
		totalInvestido: "R$ 200.000,00",
		porcentagem: "0,2% do portfolio",
		conclusao: "Dez 2026",
		prev: "(previsão)",
		lucratividade: "12%",
		descLucratividade: "ao ano",
		status: "Concluído",
		acao: "Realizar pagamento",
	},
	{
		empreendimento: "Nome do empreendimento grande pra",
		tipoDoEmpreendiment0: "Tipo do empreendimento",
		inicioInvest: "-",
		cotas: "02 cotas",
		totalInvestido: "R$ 200.000,00",
		porcentagem: "0,2% do portfolio",
		conclusao: "Dez 2026",
		prev: "(previsão)",
		lucratividade: "12%",
		descLucratividade: "ao ano",
		status: "Em andamento",
		acao: "Realizar pagamento",
	},
];

const ImoveisTable: FunctionComponent = () => {
	const [empreendimento, setEmpreendimento] =
		useState<IEmpreendimentoData | null>(null);
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<Flex flexDir={"column"} w={"70rem"} borderRadius="0.75rem" mb={"0.75rem"}>
			<ImoveisTableHeader />
			{data.map((data, index) => (
				<ImoveisTableRow
					key={index}
					acao={data.acao}
					conclusao={data.conclusao}
					cotas={data.cotas}
					descLucratividade={data.descLucratividade}
					empreendimento={data.empreendimento}
					inicioInvest={data.inicioInvest}
					lucratividade={data.lucratividade}
					porcentagem={data.porcentagem}
					prev={data.prev}
					status={data.status}
					tipoDoEmpreendiment0={data.tipoDoEmpreendiment0}
					totalInvestido={data.totalInvestido}
					setEmpreendimento={setEmpreendimento}
					modalOpen={onOpen}
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
