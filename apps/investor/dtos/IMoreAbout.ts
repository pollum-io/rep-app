export interface IMoreAbout {
	icon?: string;
	title?: string;
	description?: string;
	page?: string;
	setPage?: React.Dispatch<React.SetStateAction<string>>;
	onClick?: () => void;
}
