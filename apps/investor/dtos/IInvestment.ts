export interface InvestmentModel {
	investor_id: string;
	opportunity_id: string;
	status:
		| "PendingSignature"
		| "PendingPayment"
		| "InProgress"
		| "Concluded"
		| "Recieved";
	expected_rentability: number;
	return_realized: number;
	num_cotas: number;
	paid_installments: number;
	num_installments: number;
	total_invested: number;
	cota_price: number;
	profitability: number;
	expected_delivery_date: string;
	next_invoice: string;
	final_invoice: string;
	last_invoice_paid: string;
	enterprise_type: string;
	name: string;
	pictures_enterprise?: string[];
	geolocation?: { lat: number; lng: number };
	address?: IOpportunitieAddress;
	document_key?: string;
	opportunity_url?: string;
	url_unsigned_document?: string;
	_id?: string;
	createdAt?: string;
	percentage_of_investment?: number;
}
interface IOpportunitieAddress {
	state: string;
	state_alias: string;
	city: string;
	neighborhood: string;
	street: string;
	number: number;
}
