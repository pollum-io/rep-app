export interface IEnterpriseInvestment {
	_id: string;
	date: Date;
	shares: number;
	amount: number;
	investor_address: string;
	investment_address: string;
	transaction_hash: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
