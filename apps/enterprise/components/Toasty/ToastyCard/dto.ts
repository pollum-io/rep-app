import { IToastOptions } from "../../../contexts/toasty";

export interface IToastyCardProps {
	bg: string;
	text: string;
	state: IToastOptions;
	onClose: () => void;
}
