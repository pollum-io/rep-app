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
	defaultValue?: string;
	maxLength?: number;
	placeholderText?: string;
	setInputValues?: React.Dispatch<any>;
}

export const InputBase: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (
	{
		name,
		label,
		maskType,
		defaultValue,
		type,
		maxLength,
		placeholderText,
		setInputValues,
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
				<FormLabel htmlFor={name} fontWeight="semibold" mb="0.5rem" mt="1.5rem">
					<Text
						as="span"
						fontStyle="normal"
						fontWeight="500"
						fontSize="0.875rem"
						lineHeight="1.25rem"
						color={"#2D3748"}
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
				maskChar={null}
			>
				<ChakraInput
					disableUnderline={true}
					id={name}
					name={name}
					ref={ref}
					{...rest}
					_placeholder={{
						placeholderColor: "rgba(0, 0, 0, 0.36)",
						fontFamily: "Poppins",
					}}
					placeholder={placeholderText}
					border={"0.0938rem solid #E2E8F0"}
					fontStyle="normal"
					fontWeight="400"
					fontSize="0.875rem"
					lineHeight="1.25rem"
					borderRadius="0.375rem"
					h="2rem"
					pl="0.7rem"
					color={"#2D3748"}
					type={type}
					_hover={{}}
					_focus={{
						boxShadow: "none",
						border: "0.0938rem solid #E2E8F0",
					}}
					defaultValue={defaultValue}
					maxLength={maxLength}
				/>
			</InputMask>
		</FormControl>
	);
};

export const InputComponent = forwardRef(InputBase);
