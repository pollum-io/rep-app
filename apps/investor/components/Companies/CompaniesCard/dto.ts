export interface ICompaniesCard {
	_id?: string;
	enterprise_name?: string;
	enterprise_info?: ICompaniesInfo[];
	enterprise_logo?: string;
	enterprise_banner?: string;
	opportunities_available?: number;
	opportunities_closed?: number;
}

export interface ICompaniesDetails {
	_id: string;
	enterprise_name: string;
	enterprise_logo?: string;
	enterprise_banner?: string;
	cnpj: string;
	site_url: string;
	email: string;
	contact_number: string;
	social_media: ICompaniesSocial;
	description: string;
	address: ICompaniesAddress;
	team: ICompaniesTeam[];
	enterprise_info: ICompaniesInfo;
	investments: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface ICompaniesSocial {
	[key: string]: {
		url: string;
		username: string;
	};
}

interface ICompaniesAddress {
	state: string;
	neighborhood: string;
	street: string;
	address: string;
}

export interface ICompaniesTeam {
	name: string;
	position: string;
	image: string;
}

export interface ICompaniesInfo {
	enterprises_livn: number;
	delivered_enterprises: number;
	in_progress: number;
	total_vgv: number;
}
