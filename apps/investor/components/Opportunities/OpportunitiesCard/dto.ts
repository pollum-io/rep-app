export interface IOpportunitiesCard {
	__v: number;
	_id: string;
	enterprise_logo: string;
	address: IOpportunitieAddress;
	profitability: number;
	pictures_enterprise: string[];
	name: string;
	enterprise_type: string;
	expected_delivery_date: string; // ou data
	min_investment: number;
	isPortfolio?: boolean;
	cub_expected: number;
	description: string;
	end_date: string; // ou data
	investor_pj: string;
	general_info: string[];
	init_date: string; // ou data
	neighbor_description: string;
	pictures_extra: string[];
	pictures_neighbor: string[];
	token_price: number;
	token_minted: number;
	token_supply: number;
	token_address: string;
	createdAt: string; // ou data
	updatedAt: string; // ou data
	blocked?: boolean;
	finished?: boolean;
	sale_end_at?: string;
	isAvailable?: boolean;
	url: string;
}

export interface IOpportunitieAddress {
	state: string;
	neighborhood: string;
	street: string;
	address: number;
	state_alias?: string;
}
