import {
	Input as ChakraInput,
	InputProps as ChakraInputProps,
	FormControl,
	FormLabel,
	Text,
} from "@chakra-ui/react";
import React, { ForwardRefRenderFunction, forwardRef, useMemo } from "react";
import InputMask from "react-input-mask";

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	maskType?: string;
	type?: string;
	width?: string;
	defaultValue?: string;
	maxLength?: number;
	placeholderText?: string;
	setInputValues?: React.Dispatch<string>;
	handleInputChange?: any;
}

export const InputBase: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (
	{
		name,
		label,
		maskType,
		width,
		defaultValue,
		type,
		maxLength,
		placeholderText,
		handleInputChange,
		...rest
	},
	ref
) => {
	const maskValidation = useMemo(() => {
		if (maskType === "CPF" || maskType === "CPF do Cônjuge") {
			return "999.999.999-99";
		} else if (maskType === "CNPJ") {
			return "99.999.999/9999-99";
		} else if (maskType === "Telefone") {
			return "(99) 9 9999-9999";
		}
		return "";
	}, [maskType]);

	return (
		<FormControl id={name}>
			{label && (
				<FormLabel htmlFor={name} mb="0.5rem">
					<Text
						as="span"
						fontSize={"0.875rem"}
						color={"#2D3748"}
						fontWeight={"500"}
					>
						{label}
					</Text>
				</FormLabel>
			)}
			<InputMask
				mask={String(maskValidation)}
				value={rest.value}
				onBlur={rest.onBlur}
				onChange={rest.onChange}
			>
				<ChakraInput
					id={name}
					name={name}
					ref={ref}
					{...rest}
					placeholder={placeholderText}
					type={type}
					defaultValue={defaultValue}
					maxLength={maxLength}
					p={"0.275rem 0.75rem"}
					bgColor={"#fff"}
					borderRadius={"0.375rem"}
					border={"1px solid #E2E8F0"}
					w={width}
					h={"max"}
					_placeholder={{
						color: "rgba(0, 0, 0, 0.36)",
						fontSize: "0.875rem",
					}}
					_hover={{}}
					_focus={{
						boxShadow: "none",
						border: "0.0938rem solid #E2E8F0",
					}}
				/>
			</InputMask>
		</FormControl>
	);
};

export const InputComponent = forwardRef(InputBase);
