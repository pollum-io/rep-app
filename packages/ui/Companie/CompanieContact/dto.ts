export interface ICompanieContact {
	website?: string;
	whats?: string;
	phone?: string;
	email?: string;
	instagram?: ISocial;
	twitter?: ISocial;
	telegram?: ISocial;
	facebook?: ISocial;
}

interface ISocial {
	username?: string;
	url?: string;
}
