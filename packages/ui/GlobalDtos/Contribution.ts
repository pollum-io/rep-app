export interface IContribution {
	contributions: IContributionData[];
	paid_installments: number;
	num_installments: number;
	num_cotas: number;
	next_invoice: string;
	pendingContracts: number;
	last_payment?: string;
	amount_open_invoices?: number;
	final_invoice?: string;
}

interface IContributionData {
	_id?: string;
	investment_id: string;
	invoice_key: string;
	opportunity_name: string;
	due_date: string;
	amount: number;
	opportunity_type: string;
	paid_installments: number;
	num_installments: number;
	status:
		| "PENDING" // Em aberto
		| "CONFIRMED" // Pago
		| "OVERDUE" // Atrasado
		// Em Analise
		| "RECEIVED"
		| "REFUNDED"
		| "RECEIVED_IN_CASH"
		| "REFUND_REQUESTED"
		| "REFUND_IN_PROGRESS"
		| "CHARGEBACK_REQUESTED"
		| "CHARGEBACK_DISPUTE"
		| "AWAITING_CHARGEBACK_REVERSAL"
		| "DUNNING_REQUESTED"
		| "DUNNING_RECEIVED"
		| "AWAITING_RISK_ANALYSIS";
	installment: number;
}
