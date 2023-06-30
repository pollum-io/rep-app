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
	name?: string;
	display?: boolean;
	defaultValue?: string;
	register?: UseFormRegister<FieldValues>;
}
