export interface IEmpreendimentoData {
	empreendimento?: string;
	tipoDoEmpreendiment0?: string;
	inicioInvest?: string;
	cotas?: string;
	totalInvestido?: string;
	porcentagem?: string;
	conclusao?: string;
	prev?: string;
	lucratividade?: string;
	descLucratividade?: string;
	status?: string;
	acao?: string;
	setEmpreendimento?: React.Dispatch<
		React.SetStateAction<IEmpreendimentoData | null>
	>;
	isOpen?: boolean;
	onClose?: () => void;
	data?: IEmpreendimentoData;
	modalOpen?: () => void;
	isModal?: boolean;
}
