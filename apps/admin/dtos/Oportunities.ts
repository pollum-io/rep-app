export interface IOpportunitiesCard {
	//Section 1
	__v: number;
	_id: string;
	name: string;
	enterprise_name: string;
	description: string;
	pictures_enterprise: string[]; //file
	sub_categories?: string[];
	approval_process?: IOpportunitiesApprovalProcess[];
	init_date: string; // ou data
	expected_delivery_date: string; // ou data

	//Section 2
	building_area?: string;
	estimated_vgv?: string;
	units_number?: number;
	unit_price?: IOpportunitiesUnitPrices;
	pictures_extra: string[];
	plants?: string[]; //file
	licensing_process?: IOpportunitiesApprovalProcess[];

	//Section 3
	address: IOpportunitieAddress;
	pictures_neighbor: string[]; //file
	neighbor_description: string;

	//Section 4

	//Section 5
	return_percentage?: number;
	return_deadline?: number;
	after_tax_return_percentage?: number;
	minimum_invest?: IOpportunitiesMinInvest;
	contribution_schedule?: string[]; //file
	return_schedule?: string[]; //file
	additional_details?: string[]; //file

	//Section 6
	business_structure: string; //file
	business_timeline: string; //file
	cash_flow?: string; //file
	total_resources_raised: IOpportunitiesResources;
	additional_infos?: string[]; //files

	profitability: number;
	cub_expected: number;
	end_date: string; // ou data
	investor_pj: string;
	general_info: string[];
	blocked?: boolean;
	finished?: boolean;
	sale_end_at: string;
	incorporation_enrollment?: IOpportunitiesApprovalProcess[];

	//Section Enterprise Extra Data

	enterprise_id: string;
	enterprise_logo: string;
	enterprise_type: string;
	createdAt: string; // ou data
	updatedAt: string; // ou data
}

export interface IOpportunitiesApprovalProcess {
	nameA?: string;
	nameB?: string;
	nameC?: string;
}

export interface IOpportunitiesResources {
	name?: string;
	status?: string;
}

export interface IOpportunitiesMinInvest {
	num_available_cota?: number;
	percentage_per_cota?: number;
}

export interface IOpportunitiesUnitPrices {
	average_price?: string;
	highest_price?: string;
	lowest_price?: string;
}

export interface IOpportunitieAddress {
	state: string;
	neighborhood: string;
	street: string;
	address: number;
	state_alias?: string;
}
