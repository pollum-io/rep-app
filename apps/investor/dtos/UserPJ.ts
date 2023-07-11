export interface UserDataPJ {
	_id?: string;
	full_name: string;
	cnpj: string;
	uf: string | UfData;
	email: string;
	contact_number: string;
	address: string;
	legal_representatives?: string[];
	partners?: string[];
	invited_by?: string;
	createdAt?: string;
	updatedAt?: string;
	isPerfilCompleted?: boolean;
	__v?: number;
}
type UfData = {
	uf: string;
};
