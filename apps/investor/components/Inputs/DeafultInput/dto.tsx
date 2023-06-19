import { FieldValues, UseFormRegister } from "react-hook-form";

export interface IDefaultInput {
	title?: string;
	color?: string;
	placeholderColor?: string;
	bgColor?: string;
	inputSize?: string;
	placeholder?: string;
	type?: string;
	border?: string;
	inputColor?: string;
	registerType?: string;
	name?: any;
	display?: boolean;
	defaultValue?: any;
	register?: UseFormRegister<FieldValues>;
}
