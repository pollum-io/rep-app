import React, {
	ForwardRefRenderFunction,
	FunctionComponent,
	useEffect,
} from "react";
import {
	FormControl,
	FormLabel,
	Select,
	Text,
	SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
interface SelectProps extends ChakraSelectProps {
	name: string;
	label?: string;
	type?: string;
	selectValue?: any;
	setData?: any;
	defaultValue?: string;
	setInputValues?: React.Dispatch<any>;
}

export const SelectComponent: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectProps
> = (
	{
		name,
		label,
		type,
		selectValue,
		setData,
		defaultValue,
		setInputValues,
		...rest
	},
	ref
) => {
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
			{selectValue && type === "uf" && (
				<Select
					id={name}
					name={name}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={e => {
						setInputValues &&
							setInputValues((prevState: any) => ({
								...prevState,
								[type]: e.target.value,
							}));
					}}
				>
					{selectValue?.map((value: any) => (
						<option key={value.id} value={value.Uf}>
							{value.State}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "marital" && (
				<Select
					id={name}
					name={name}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={e => setData(e.target.value)}
					defaultValue={defaultValue}
				>
					{selectValue?.map((value: any) => (
						<option key={value.id} value={value.name}>
							{value.name}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "regime_patrimonial" && (
				<Select
					id={name}
					name={name}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={e => {
						setData(e.target.value);
						setInputValues &&
							setInputValues((prevState: any) => ({
								...prevState,
								[type]: e.target.value,
							}));
					}}
					defaultValue={defaultValue}
				>
					{selectValue?.map((value: any) => (
						<option key={value.id} value={value.name}>
							{value.name}
						</option>
					))}
				</Select>
			)}
		</FormControl>
	);
};
