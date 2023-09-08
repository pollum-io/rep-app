export interface UserDataPF {
	address?: string;
	birthday_date?: Date;
	city_of_birth?: string;
	cpf?: string;
	createdAt?: string;
	email?: string;
	full_name?: string;
	invited_by?: string;
	is_legal_entity?: boolean;
	marital_status?: MaritalStatus;
	contact_number?: string;
	profession?: string;
	rg?: string;
	updatedAt?: string;
	is_profile_filled?: boolean;
	__v?: number;
	_id?: string;
}

export type MaritalStatus = {
	equity_regime?: string | null;
	contractor?: string | null;
	//se uniao estavel
	partners_address?: string | null;
	partners_cpf?: string | null;
	partners_name?: string | null;
	partners_rg?: string | null;
	//se casado
	status?: string | null;
};
