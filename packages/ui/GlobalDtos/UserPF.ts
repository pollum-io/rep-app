export interface UserDataPF {
	address?: Address;
	birthday_date?: Date | string;
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

interface Address {
	state: string;
	city: string;
	state_alias?: string;
	neighborhood: string;
	street: string;
	number: number;
}

export type MaritalStatus = {
	status?: string | null;
	equity_regime?: string | null;
	contractor?: string | null;
	//se uniao estavel
	spouses_address?: string | null;
	spouses_cpf?: string | null;
	spouses_name?: string | null;
	spouses_rg?: string | null;
	//se casado
	partners_address?: string | null;
	partners_cpf?: string | null;
	partners_name?: string | null;
	partners_rg?: string | null;
};
