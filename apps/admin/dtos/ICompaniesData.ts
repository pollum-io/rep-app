export interface ICompanieData {
	address: {
		state: string;
		state_alias: string;
		city: string;
		neighborhood: string;
		street: string;
	};
	cnpj: string;
	contact_number: string;
	createdAt: string;
	description: string;
	email: string;
	enterprise_banner: string;
	enterprise_info: {
		delivered_enterprises: number;
		enterprises_livn: number;
		in_progress: number;
		total_vgv: number;
	};
	delivered_enterprises: number;
	enterprises_livn: number;
	in_progress: number;
	total_vgv: number;
	enterprise_logo: string;
	enterprise_name: string;
	investments: string[];
	opportunities_available: number;
	opportunities_closed: number;
	site_url: string;
	social_media: {
		instagram: {
			url: string;
			username: string;
		};
		twitter: {
			url: string;
			username: string;
		};
		// ... outras redes sociais
	};
	team: {
		name: string;
		position: string;
		image: string;
	}[];
	updatedAt: string;
	__v: number;
	_id: string;
}
