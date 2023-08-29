export interface IEmpreendimentoData {
	name?: string;
	investor_id?: string;
	opportunity_id?: string;
	status?: "PendingSignature" | "PendingPayment" | "InProgress" | "Concluded";
	expected_rentability?: number;
	return_realized?: number;
	num_cotas?: number;
	paid_installments?: number;
	num_installments?: number;
	total_invested?: number;
	cota_price?: number;
	profitability?: number;
	expected_delivery_date?: string;
	next_invoice?: string;
	final_invoice?: string;
	last_invoice_paid?: string;
	enterprise_type?: string;
	pictures_enterprise?: string[];
	document_key?: string;
	acao?: string;
	token?: string;
	_id?: string;
	opportunity_url?: string;
	url_unsigned_document?: string;
	setEmpreendimento?: React.Dispatch<
		React.SetStateAction<IEmpreendimentoData | null>
	>;
	isOpen?: boolean;
	onClose?: () => void;
	data?: IEmpreendimentoData;
	modalOpen?: () => void;
	isModal?: boolean;
}
