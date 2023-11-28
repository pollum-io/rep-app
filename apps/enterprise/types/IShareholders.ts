export interface IShareholder {
	investment: {
		cota_price: number | null;
		expected_rentability: number | null;
		final_invoice: string | null;
		investment_id: string | null;
		last_invoice_paid: string | null;
		next_invoice: string | null;
		num_cotas: number | null;
		num_installments: number | null;
		paid_installments: number | null;
		return_realized: number | null;
		status: string | null;
		unpaid_installments: number | null;
	};
	investor: {
		cpf: string | null;
		investor_id: string | null;
		name: string | null;
	};
	opportunity: {
		enterprise_log: string | null;
		enterprise_type: string | null;
		images: string[] | null;
		name: string | null;
		opportunity_id: string | null;
		url: string | null;
	};
}
