export interface ICompanieContact {
	website?: string;
	whatsapp?: string;
	telephone?: string;
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
