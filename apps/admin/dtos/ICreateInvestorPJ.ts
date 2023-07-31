export interface ICreateInvestorPJ {
	full_name: string;
	cnpj: string;
	uf: string;
	is_legal_entity?: boolean;
	invited_by: string;
	isPerfilCompleted: boolean;
}
