import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Button } from "@chakra-ui/react";
import { IOpportunitiesCard } from "../../../dtos/Oportunities";
import { InputComponent } from "../InputForm";

export const MyForm = () => {
	const { handleSubmit, register } = useForm();

	const onSubmit = (data: IOpportunitiesCard) => {
		// Handle form submission here
		console.log(data);
	};

	return (
		<Flex justifyContent={"center"}>
			<Flex flexDir={"column"} p="2rem">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex
						flexDir={"column"}
						justifyContent={"center"}
						flexWrap={"wrap"}
						w={"max"}
						h={"50%"}
					>
						{/* /Section 1/ */}
						<InputComponent label="Nome" type="text" {...register("name")} />
						<InputComponent
							label="Empresa responsavel"
							type="text"
							{...register("enterprise_name")}
						/>
						<InputComponent
							label="Descrição"
							type="text"
							{...register("description")}
						/>
						<InputComponent
							label="Imagens do empreendimento"
							type="text"
							{...register("pictures_enterprise")}
						/>
						<InputComponent
							label="Categorias"
							type="text"
							{...register("sub_categories")}
						/>
						<InputComponent
							label="Estado atual da obra"
							type="text"
							{...register("approval_process")}
						/>
						<InputComponent
							label="Começo da obra"
							type="text"
							{...register("init_date")}
						/>
						<InputComponent
							label="Previsão de conclusão"
							type="text"
							{...register("expected_delivery_date")}
						/>
						{/* /Section 2/ */}
						<InputComponent
							label="Area construida"
							type="text"
							{...register("building_area")}
						/>
						<InputComponent
							label="VGV Estimado"
							type="text"
							{...register("estimated_vgv")}
						/>
						<InputComponent
							label="Numero de unidades"
							type="text"
							{...register("units_number")}
						/>{" "}
						<InputComponent
							label="Preço das unidades"
							type="text"
							{...register("unit_price")}
						/>
						<InputComponent
							label="Cronograma estimado"
							type="text"
							{...register("licensing_process")}
						/>
						<InputComponent
							label="Fotos complementares"
							type="text"
							{...register("pictures_extra")}
						/>
						<InputComponent
							label="Plantas do empreendimento"
							type="text"
							{...register("plants")}
						/>
						{/* /Section 3/ */}
						<InputComponent
							label="Endereço"
							type="text"
							{...register("address")}
						/>{" "}
						<InputComponent
							label="Fotos da região"
							type="text"
							{...register("pictures_neighbor")}
						/>{" "}
						<InputComponent
							label="Descrição"
							type="text"
							{...register("neighbor_description")}
						/>{" "}
						{/* /Section 4/ */}
						{/* /Section 5/ */}
						<InputComponent
							label="Percentual de retorno"
							type="text"
							{...register("return_percentage")}
						/>{" "}
						<InputComponent
							label="Prazo de retorno"
							type="text"
							{...register("return_deadline")}
						/>
						<InputComponent
							label="Percentual do retorno após impostos: number"
							type="text"
							{...register("after_tax_return_percentage")}
						/>
						<InputComponent
							label="Investimento minimo"
							type="text"
							{...register("minimum_invest")}
						/>
						<InputComponent
							label="Cronograma de aportes"
							type="text"
							{...register("contribution_schedule")}
						/>
						<InputComponent
							label="Cronograma de retorno"
							type="text"
							{...register("return_schedule")}
						/>
						<InputComponent
							label="Detalhes adicionais"
							type="text"
							{...register("additional_details")}
						/>
						{/* /Section 6/ */}
						<InputComponent
							label="Estrutura de negocios"
							type="text"
							{...register("business_structure")}
						/>
						<InputComponent
							label="Cronograma"
							type="text"
							{...register("business_timeline")}
						/>
						<InputComponent
							label="Fluxo de caixa"
							type="text"
							{...register("cash_flow")}
						/>
						<InputComponent
							label="Total de recursos a serem levantandos"
							type="text"
							{...register("total_resources_raised")}
						/>
						<InputComponent
							label="Informações adicionais"
							type="text"
							{...register("additional_infos")}
						/>
					</Flex>
					<Button type="submit" mt="1rem">
						Submit
					</Button>
				</form>
			</Flex>
		</Flex>
	);
};
