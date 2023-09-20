import React, { ForwardRefRenderFunction, forwardRef, useState } from "react";
import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { InputValues, SelectProps } from "../../dtos/ISelectProps";

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
		data,
		defaultValue,
		setInputValues,
		...rest
	},
	ref
) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue);

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
					defaultValue={defaultValue}
					onChange={(e) => {
						setInputValues &&
							setInputValues((prevState: InputValues) => ({
								...prevState,
								[type]: e.target.value,
							}));
					}}
				>
					{selectValue?.map((value, index: number) => (
						<option key={index} value={value.Uf}>
							{value.State}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "marital" && (
				<Select
					id={name}
					name={name}
					ref={ref}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={(e) => {
						setData(e.target.value);
						rest.onChange(e);
					}}
					defaultValue={defaultValue}
					value={data}
				>
					{selectValue?.map((value, index: number) => (
						<option key={index} value={value.name}>
							{value.name}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "regime_patrimonial" && (
				<Select
					id={name}
					name={name}
					ref={ref}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={(e) => {
						setData(e.target.value);
						rest.onChange(e);
					}}
					value={data}
					defaultValue={defaultValue}
				>
					{selectValue?.map((value, index: number) => (
						<option key={index} value={value.name}>
							{value.name}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "user-uf" && (
				<Select
					id={name}
					name={name}
					ref={ref}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={(e) => {
						setData(e.target.value);
						rest.onChange(e);
					}}
					value={data}
					defaultValue={defaultValue}
				>
					{selectValue?.map((value, index: number) => (
						<option key={index} value={`${value.sigla},${value.nome}`}>
							{value.nome}
						</option>
					))}
				</Select>
			)}
			{selectValue && type === "user-city" && (
				<Select
					id={name}
					name={name}
					ref={ref}
					{...rest}
					_hover={{}}
					w={""}
					h="2rem"
					border={"0.0938rem solid #E2E8F0"}
					placeholder="Select option"
					color={"black"}
					fontSize="0.875rem"
					onChange={(e) => {
						setData(e.target.value);
						rest.onChange(e);
					}}
					value={data}
				>
					{selectValue?.map((value, index: number) => (
						<option key={index} value={value.nome}>
							{value.nome}
						</option>
					))}
				</Select>
			)}
		</FormControl>
	);
};

export default forwardRef(SelectComponent);
