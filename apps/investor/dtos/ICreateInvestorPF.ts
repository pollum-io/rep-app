export interface ICreateInvestorPF {
	full_name: string;
	cpf: string;
	birthday_date: Date;
	is_legal_entity?: boolean;
	invited_by: string;
	email: string;
}
