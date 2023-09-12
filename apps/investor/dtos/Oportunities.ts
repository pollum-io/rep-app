export interface IOpportunitiesCard {
	_id?: string;
	name: string;
	url?: string;
	address?: IOpportunitieAddress;
	bank_details?: { pix_key: string | null };
	enterprise_id: string;
	enterprise_logo?: string;
	min_investment: number;
	init_date: string;
	expected_delivery_date: string;
	end_date: string;
	profitability: number;
	cub_current?: number;
	cub_expected?: number;
	description: string;
	event_ensuing?: object;
	neighbor_description: string;
	pictures_neighbor: string[];
	pictures_enterprise: string[];
	sale_end_at?: string;
	geolocation?: { lat: number; lng: number };
	enterprise_type: string;
	description_extra?: string;
	picture_extra?: string[];
	enterprise_name?: string;
	tags?: string[];
	blueprints?: Array<{ file: string; name: string }>;
	opportunities_details?: {
		constructed_area: number;
		estimated_vgv: number;
		total_units: number;
		available_units: number;
		average_price: number;
	};
	estimated_conogram?: Array<{ name: string; status: string }>;
	complementary_addresses?: IOpportunitieAddress[];
	opportunity_resume?: {
		percentage_final_return: number;
		total_deadline: number;
		min_investment: number;
		disbursement_schedule: Array<{ date: Date; value: number }>;
		return_descritption: string;
		return_schedule: Array<{ date: Date; value: number }>;
	};
	opportunity_resume_files?: Array<{ file: string; name: string }>;
	business_details?: {
		business_structure: string;
		description_flows_raised: Array<{ item: string; value: number }>;
		additional_files: Array<{ file: string; name: string }>;
	};
	schedule_table?: IScheduleTable[];
	sub_categories?: string[];
	approval_process?: IProcessStatus[];
	licensing_process?: IProcessStatus[];
	incorporation_enrollment?: IProcessStatus[];
}

export interface IScheduleTable {
	period: number;
	cost: number;
	total_revenue: number;
	total_revenue_percentage: number;
	units_sold: number;
	cash_flow: number;
}

export interface IOpportunitieAddress {
	state: string;
	state_alias: string;
	city: string;
	neighborhood: string;
	street: string;
	number: number;
}

export interface IProcessStatus {
	name: string;
	status: string;
}
