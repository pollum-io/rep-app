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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";
import { useToasty } from "../../../hooks/useToasty";
import { InputComponent } from "../../Inputs/DeafultInput/InputComponent";
import SelectComponent from "../../Select/SelectComponent";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatCPF } from "../../../utils/formatCpf";
import { estadosCivis } from "../mockedData/estadosCivis";
import { estadosRegimesPatrimoniais } from "../mockedData/estadosRegimesPatrimoniais";
import { MaritalStatus, UserDataPF } from "../../../dtos/UserPF";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import { fetchEditInvestorPF, fetchGetInvestorPFById } from "services";

interface IPersonalDataPF {
	userDataPF?: UserDataPF;
	token?: string;
	isCheckout?: boolean;
}

export const PersonalDataPF: React.FC<IPersonalDataPF> = (props) => {
	const { userDataPF, token } = props;
	const [defaultValues, setDefaultValues] = useState<UserDataPF>();
	const [isDisabled] = useState(true);
	const [equityRegime, setEquityRegime] = useState<string>("");
	const [isMarried, setIsMarried] = useState<boolean>();

	const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>();
	const { userInfos } = useUser();
	const { toast } = useToasty();
	const { t } = useTranslation();

	const { isLoading } = useQuery(
		"id",
		async () => await fetchGetInvestorPFById(userDataPF?._id, token),
		{
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
			onSuccess: (data) => {
				const formValues: UserDataPF = {
					full_name: data?.data?.full_name,
					city_of_birth: data?.data?.city_of_birth,
					birthday_date: new Date(data?.data?.birthday_date)
						.toISOString()
						.split("T")[0],
					cpf: formatCPF(data?.data?.cpf),
					rg: data?.data?.rg,
					address: data?.data?.address,
					profession: data?.data?.profession,
					email: data?.data?.email,
					contact_number: formatPhoneNumber(data?.data?.contact_number),
					marital_status: {
						status: data?.data?.marital_status?.status,
						contractor: data?.data?.marital_status?.contractor,
						spouses_name: data?.data?.marital_status?.partners_name,
						spouses_cpf: formatCPF(data?.data?.marital_status?.partners_cpf),
						spouses_rg: data?.data?.marital_status?.partners_rg,
						spouses_address: data?.data?.marital_status?.partners_address,
					},
				};

				if (data?.data?.marital_status?.status === "Casado(a)") {
					formValues.marital_status.equity_regime =
						data?.data?.marital_status?.equity_regime;
					formValues.marital_status.contractor =
						data?.data?.marital_status?.contractor;
					formValues.marital_status.partners_name =
						data?.data?.marital_status?.partners_name;
					formValues.marital_status.partners_cpf = formatCPF(
						data?.data?.marital_status?.partners_cpf
					);
					formValues.marital_status.partners_rg =
						data?.data?.marital_status?.partners_rg;
					formValues.marital_status.partners_address =
						data?.data?.marital_status?.partners_address;
				}

				reset(formValues);
				setDefaultValues(formValues);
			},
		}
	);

	const { register, handleSubmit, reset, watch } = useForm();

	const onSubmitForm = async (data: UserDataPF) => {
		let request: UserDataPF;
		let value: MaritalStatus;

		if (watch("marital_status.status") === "Casado(a)") {
			value = {
				status: data?.marital_status?.status,
				equity_regime: data?.marital_status?.equity_regime,
				contractor: data?.marital_status.contractor,
				partners_name: data?.marital_status?.partners_name,
				partners_cpf: data?.marital_status?.partners_cpf,
				partners_rg: data?.marital_status?.partners_rg,
				partners_address: data?.marital_status?.partners_address,
			};
		} else if (watch("marital_status.status") === "União Estável") {
			value = {
				status: data?.marital_status?.status,
				partners_name: data?.marital_status?.spouses_name,
				partners_cpf: data?.marital_status?.spouses_cpf,
				partners_rg: data?.marital_status?.spouses_rg,
				partners_address: data?.marital_status?.spouses_address,
			};
		} else {
			value = {
				status: data?.marital_status?.status,
				partners_name: "",
				partners_cpf: "",
				partners_rg: "",
				partners_address: "",
			};
		}
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

		await fetchEditInvestorPF(userInfos, request, token)
			.then((res) => {
				if (res) {
					toast({
						id: "toast-edit",
						position: "top-right",
						status: "success",
						title: t("editProfile.toastTitle"),
						description: t("editProfile.toastDescription"),
					});
				}
			})
			.catch((err) => {
				if (err) {
					toast({
						id: "toast-edit",
						position: "top-right",
						status: "success",
						title: "Preencha as informações corretamente!",
						description:
							"Verifique se existe algum campo que nao foi preenchido ainda",
					});
				}
			});
	};

	useEffect(() => {
		if (watch("marital_status.status") === "Casado(a)") {
			setIsMarried(true);
		}
	}, [watch]);
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
				{isLoading ? (
					<Flex
						zIndex={"99999"}
						justifyContent={"center"}
						bgColor={"#ffffff7f"}
						w={"100%"}
						h={"60rem"}
						position={"relative"}
						mt={"14rem"}
					>
						<Oval
							height={100}
							width={100}
							color="#1789A3"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="oval-loading"
							secondaryColor="#bdbdbd"
							strokeWidth={2}
							strokeWidthSecondary={2}
						/>
					</Flex>
				) : (
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
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.city") as string}
										type="text"
										{...register("city_of_birth")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("register.birthDate") as string}
										type="date"
										{...register("birthday_date")}
										maskType={"data"}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("register.socialNumber") as string}
										type="text"
										maskType={"CPF"}
										{...register("cpf")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.rg") as string}
										type="text"
										{...register("rg")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.address") as string}
										type="text"
										{...register("address")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.occupation") as string}
										type="text"
										{...register("profession")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.email") as string}
										type="email"
										{...register("email")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.phone") as string}
										type="text"
										maskType={"Telefone"}
										{...register("contact_number")}
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
									selectValue={estadosCivis}
									label={t("editProfile.civil") as string}
									type="marital"
									{...register("marital_status.status", {
										onChange(e) {
											reset({
												...defaultValues,
												marital_status: {
													...defaultValues.marital_status,
													status: e.target.value,
													// equity_regime: "",
													// contractor: "",
													// partners_name: "",
													// partners_cpf: "",
													// partners_rg: "",
													// partners_address: "",
													// spouses_name: "",
													// spouses_cpf: "",
													// spouses_rg: "",
													// spouses_address: "",
												},
											});
										},
									})}
									setData={setSelectedMaritalStatus}
									data={selectedMaritalStatus}
								/>
								<Collapse in={watch("marital_status.status") === "Casado(a)"}>
									<SelectComponent
										setData={setEquityRegime}
										label={t("editProfile.regimePatrimonial") as string}
										type="regime_patrimonial"
										selectValue={estadosRegimesPatrimoniais}
										data={equityRegime}
										{...register("marital_status.equity_regime")}
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
										<RadioGroup
											defaultValue={watch("marital_status.contractor")}
											mt={"0.75rem"}
										>
											<Stack direction="column" gap={"0.75rem"}>
												<Radio
													value="me"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
												>
													<Text color={"#171923"} fontSize={"0.875rem"}>
														Apenas você
													</Text>
												</Radio>
												<Radio
													color={"#171923"}
													fontSize={"0.875rem"}
													value="spouse"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
												>
													<Text color={"#171923"} fontSize={"0.875rem"}>
														Apenas seu cônjuge{" "}
													</Text>
												</Radio>
												<Radio
													color={"#171923"}
													fontSize={"0.875rem"}
													value="both"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
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
										{...register("marital_status.partners_name")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spouseSocialNumber") as string}
										type="text"
										maskType={"CPF"}
										{...register("marital_status.partners_cpf")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spousesRG") as string}
										type="text"
										{...register("marital_status.partners_rg")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spousesAddress") as string}
										type="text"
										{...register("marital_status.partners_address")}
									/>
								</Collapse>
								<Collapse
									in={watch("marital_status.status") === "União Estável"}
								>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersName") as string}
										type="text"
										{...register("marital_status.spouses_name")}
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
										<RadioGroup
											defaultValue={watch("marital_status.contractor")}
											mt={"0.75rem"}
										>
											<Stack direction="column" gap={"0.75rem"}>
												<Radio
													value="me"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
												>
													<Text color={"#171923"} fontSize={"0.875rem"}>
														Apenas você
													</Text>
												</Radio>
												<Radio
													color={"#171923"}
													fontSize={"0.875rem"}
													value="spouse"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
												>
													<Text color={"#171923"} fontSize={"0.875rem"}>
														Apenas seu cônjuge{" "}
													</Text>
												</Radio>
												<Radio
													color={"#171923"}
													fontSize={"0.875rem"}
													value="both"
													colorScheme={"cyan"}
													{...register("marital_status.contractor")}
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
										{...register("marital_status.spouses_cpf")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersRG") as string}
										type="text"
										{...register("marital_status.spouses_rg")}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersAddress") as string}
										type="text"
										{...register("marital_status.spouses_address")}
									/>
								</Collapse>
							</Flex>
						</Flex>

						{watch("marital_status.status") === "União Estável" && (
							<Checkbox mt={"0rem"} mb={"2rem"}>
								<Text fontSize={"0.875rem"} color={"#2D3748"}>
									Declaro que estou em união estável.
								</Text>
							</Checkbox>
						)}
						{watch("marital_status.status") === "Casado(a)" && (
							<Checkbox mt={"0rem"} mb={"2rem"}>
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
								_hover={
									isDisabled ? { opacity: "0.3" } : { bgColor: "#171923" }
								}
								_active={{}}
								type="submit"
							>
								{t("editProfile.saved") as string}
							</Button>
						</Flex>
					</form>
				)}
			</Flex>
		</Flex>
	);
};
