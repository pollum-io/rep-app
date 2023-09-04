import {
	Button,
	Checkbox,
	Collapse,
	Flex,
	Img,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";
import { useToasty } from "../../../hooks/useToasty";
import { fetchEditInvestorPF } from "../../../services";
import { InputComponent } from "../../Inputs/DeafultInput/InputComponent";
import { SelectComponent } from "../../Select/SelectComponent";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatCPF } from "../../../utils/formatCpf";
import { estadosCivis } from "../mockedData/estadosCivis";
import { estadosRegimesPatrimoniais } from "../mockedData/estadosRegimesPatrimoniais";
import { MaritalStatus, UserDataPF } from "../../../dtos/UserPF";
import { useQuery } from "react-query";

interface IPersonalDataPF {
	data?: UserDataPF;
	token?: string;
	isCheckout?: boolean;
}

export const PersonalDataPF: React.FC<IPersonalDataPF> = (props) => {
	const { data, token } = props;
	const [isDisabled] = useState(true);
	const [maritalStatus, setMaritalStatus] = useState<string>(
		data?.marital_status?.status
	);
	const { t } = useTranslation();
	const isMerried: boolean = maritalStatus === "Casado(a)" ? true : false;
	const isStableUnion: boolean =
		maritalStatus === "União Estável" ? true : false;
	const [equityRegime, setEquityRegime] = useState<string>("");
	const { register, handleSubmit } = useForm();
	const { userInfos } = useUser();
	const { toast } = useToasty();
	const dataFormatada = new Date(data?.birthday_date)
		?.toISOString()
		?.split("T")[0];
	const [value, setValue] = useState("1");

	const onSubmitForm = async (data: UserDataPF) => {
		let request: UserDataPF;
		let value: MaritalStatus;
		// eslint-disable-next-line prefer-const
		value = isMerried
			? {
					status: maritalStatus,
					equity_regime: isMerried ? equityRegime : "",
					spouse_name: isMerried ? data?.marital_status?.spouse_name : "",
					spouse_cpf: isMerried ? data?.marital_status?.spouse_cpf : "",
					spouse_rg: isMerried ? data?.marital_status?.spouse_rg : "",
					spouse_address: isMerried ? data?.marital_status?.spouse_address : "",
			  }
			: {
					status: maritalStatus,
					partners_name: isStableUnion
						? data?.marital_status?.partners_name
						: "",
					partners_cpf: isStableUnion ? data?.marital_status?.partners_cpf : "",
					partners_rg: isStableUnion ? data?.marital_status?.partners_rg : "",
					partners_address: isStableUnion
						? data?.marital_status?.partners_address
						: "",
			  };

		// eslint-disable-next-line prefer-const
		request = {
			full_name: data.full_name,
			birthday_date: new Date(data.birthday_date),
			cpf: data.cpf.replace(/[^\w]/gi, "").replace(/\s+/g, ""),
			email: data.email,
			contact_number: data.contact_number
				.replace(/[^\w]/gi, "")
				.replace(/\s+/g, ""),
			city_of_birth: data.city_of_birth,
			rg: data.rg,
			profession: data.profession,
			address: data.address,
			marital_status: value,
		};

		// await fetchEditInvestorPF(userInfos, request, token)
		// 	.then((res) => {
		// 		if (res) {
		// 			toast({
		// 				id: "toast-edit",
		// 				position: "top-right",
		// 				status: "success",
		// 				title: t("editProfile.toastTitle"),
		// 				description: t("editProfile.toastDescription"),
		// 			});
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		if (err) {
		// 			toast({
		// 				id: "toast-edit",
		// 				position: "top-right",
		// 				status: "success",
		// 				title: "Preencha as informações corretamente!",
		// 				description:
		// 					"Verifique se existe algum campo que nao foi preenchido ainda",
		// 			});
		// 		}
		// 	});
	};

	return (
		<Flex w="100%" justifyContent="end">
			<Flex flexDirection="column" gap="2.75rem" w="100%" maxWidth="47.4375rem">
				{!props?.isCheckout && (
					<Flex gap="1.5rem" alignItems="center">
						<Img src="/icons/Avatar.png" w="6rem" h="6rem" />
						<Text
							fontFamily="Poppins"
							fontWeight="600"
							fontSize="1.5rem"
							lineHeight="2rem"
							alignItems="center"
							color="#171923"
						>
							{t("editProfile.edit")}
						</Text>
					</Flex>
				)}

				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Flex justifyContent="space-between" w="100%">
						<Flex
							flexDirection="column"
							fontFamily="Poppins"
							fontStyle="normal"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#2D3748"
							w="100%"
							maxWidth="18.5rem"
							gap="1.5rem"
						>
							<Flex flexDirection="column" gap="0.25rem" mb="2.75rem">
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.name") as string}
									type="text"
									{...register("full_name")}
									defaultValue={data?.full_name}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.city") as string}
									type="text"
									{...register("city_of_birth")}
									defaultValue={data?.city_of_birth}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("register.birthDate") as string}
									type="date"
									{...register("birthday_date")}
									defaultValue={dataFormatada}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("register.socialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("cpf")}
									defaultValue={formatCPF(data?.cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.rg") as string}
									type="text"
									{...register("rg")}
									defaultValue={data?.rg}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.address") as string}
									type="text"
									{...register("address")}
									defaultValue={data?.address}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.occupation") as string}
									type="text"
									{...register("profession")}
									defaultValue={data?.profession}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.email") as string}
									type="email"
									{...register("email")}
									defaultValue={data?.email}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.phone") as string}
									type="text"
									maskType={"Telefone"}
									{...register("contact_number")}
									defaultValue={formatPhoneNumber(data?.contact_number)}
								/>
							</Flex>
						</Flex>
						<Flex
							flexDirection="column"
							gap="0.25rem"
							fontFamily="Poppins"
							fontStyle="normal"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							w="20rem"
						>
							<SelectComponent
								defaultValue={data?.marital_status?.status}
								setData={setMaritalStatus}
								label={t("editProfile.civil") as string}
								type="marital"
								selectValue={estadosCivis}
								{...register("status")}
							/>
							<Collapse in={maritalStatus === "Casado(a)" && isMerried}>
								<SelectComponent
									defaultValue={data.marital_status?.equity_regime}
									setData={setEquityRegime}
									label={t("editProfile.regimePatrimonial") as string}
									type="regime_patrimonial"
									selectValue={estadosRegimesPatrimoniais}
									{...register("equity_regime")}
								/>
								<Flex flexDir={"column"} my={"1.5rem"}>
									<Text
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color={"#2D3748"}
									>
										{" "}
										Quem será o contratante no contrato?
									</Text>
									<RadioGroup onChange={setValue} mt={"0.75rem"}>
										<Stack direction="column" gap={"0.75rem"}>
											<Radio value="1" colorScheme={"cyan"}>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Apenas você
												</Text>
											</Radio>
											<Radio
												color={"#171923"}
												fontSize={"0.875rem"}
												value="2"
												colorScheme={"cyan"}
											>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Apenas seu cônjuge{" "}
												</Text>
											</Radio>
											<Radio
												color={"#171923"}
												fontSize={"0.875rem"}
												value="3"
												colorScheme={"cyan"}
											>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Ambos{" "}
												</Text>
											</Radio>
										</Stack>
									</RadioGroup>
								</Flex>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.spousesName") as string}
									type="text"
									{...register("spouse_name")}
									defaultValue={data?.marital_status?.spouse_name}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.spouseSocialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("spouse_cpf")}
									defaultValue={formatCPF(data?.marital_status?.spouse_cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.spousesRG") as string}
									type="text"
									{...register("spouse_rg")}
									defaultValue={data?.marital_status?.spouse_rg}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.spousesAddress") as string}
									type="text"
									{...register("spouse_address")}
									defaultValue={data?.marital_status?.spouse_address}
								/>
							</Collapse>
							<Collapse in={maritalStatus === "União Estável" && isStableUnion}>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.partnersName") as string}
									type="text"
									{...register("partners_name")}
									defaultValue={data?.marital_status?.partners_name}
								/>
								<Flex flexDir={"column"} my={"1.5rem"}>
									<Text
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color={"#2D3748"}
									>
										{" "}
										Quem será o contratante no contrato?
									</Text>
									<RadioGroup onChange={setValue} mt={"0.75rem"}>
										<Stack direction="column" gap={"0.75rem"}>
											<Radio value="1" colorScheme={"cyan"}>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Apenas você
												</Text>
											</Radio>
											<Radio
												color={"#171923"}
												fontSize={"0.875rem"}
												value="2"
												colorScheme={"cyan"}
											>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Apenas seu cônjuge{" "}
												</Text>
											</Radio>
											<Radio
												color={"#171923"}
												fontSize={"0.875rem"}
												value="3"
												colorScheme={"cyan"}
											>
												<Text color={"#171923"} fontSize={"0.875rem"}>
													Ambos{" "}
												</Text>
											</Radio>
										</Stack>
									</RadioGroup>
								</Flex>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.partnersSocialNumber") as string}
									type="text"
									maskType={"CPF"}
									{...register("partners_cpf")}
									defaultValue={formatCPF(data?.marital_status?.partners_cpf)}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.partnersRG") as string}
									type="text"
									{...register("partners_rg")}
									defaultValue={data?.marital_status?.partners_rg}
								/>
								<InputComponent
									placeholderText={t("inputs.insertHere") as string}
									label={t("editProfile.partnersAddress") as string}
									type="text"
									{...register("partners_address")}
									defaultValue={data?.marital_status?.partners_address}
								/>
							</Collapse>
						</Flex>
					</Flex>
					{isStableUnion && (
						<Checkbox mt={"1.5rem"} mb={"2rem"}>
							<Text fontSize={"0.875rem"} color={"#2D3748"}>
								Declaro que estou em união estável.
							</Text>
						</Checkbox>
					)}
					{!isMerried && !isStableUnion && (
						<Checkbox mt={"1.5rem"} mb={"2rem"}>
							<Text fontSize={"0.875rem"} color={"#2D3748"}>
								Declaro que não estou em uma convivência de união estável.
							</Text>
						</Checkbox>
					)}
					<Flex w="100%" justifyContent="flex-start">
						<Button
							w="13.375rem"
							h="2rem"
							background="#2D3748"
							borderRadius="0.5rem"
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#FFFFFF"
							_hover={isDisabled ? { opacity: "0.3" } : { bgColor: "#171923" }}
							_active={{}}
							type="submit"
						>
							{t("editProfile.saved") as string}
						</Button>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
};
