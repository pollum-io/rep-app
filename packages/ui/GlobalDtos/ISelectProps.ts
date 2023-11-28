import { SelectProps as ChakraSelectProps } from "@chakra-ui/react";

export interface UfValue {
	id: number;
	Uf: string;
	State: string;
}

export interface RelationshipType {
	id: number;
	name: string;
}

export interface UnionType {
	id: number;
	name: string;
}

export interface InputValues {
	[key: string]: string;
}

export interface SelectProps extends ChakraSelectProps {
	name: string;
	label?: string;
	type?: string;
	selectValue?: UfValue[] | RelationshipType[] | UnionType[];
	setData?: React.Dispatch<React.SetStateAction<string>>;
	data?: string;
	defaultValue?: string;
	setInputValues?: React.Dispatch<React.SetStateAction<InputValues>>;
}
