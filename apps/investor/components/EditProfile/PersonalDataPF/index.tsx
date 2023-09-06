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
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";
import { useToasty } from "../../../hooks/useToasty";
import { fetchEditInvestorPF, fetchGetInvestorPFById } from "../../../services";
import { InputComponent } from "../../Inputs/DeafultInput/InputComponent";
import SelectComponent from "../../Select/SelectComponent";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatCPF } from "../../../utils/formatCpf";
import { estadosCivis } from "../mockedData/estadosCivis";
import { estadosRegimesPatrimoniais } from "../mockedData/estadosRegimesPatrimoniais";
import { MaritalStatus, UserDataPF } from "../../../dtos/UserPF";
import { formatDateBirthday } from "../../../utils/formatDate";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";

interface IPersonalDataPF {
	userDataPF?: UserDataPF;
	token?: string;
	isCheckout?: boolean;
}

export const PersonalDataPF: React.FC<IPersonalDataPF> = (props) => {
	const { userDataPF, token } = props;

	const { userInfos } = useUser();
	const { toast } = useToasty();
	const { t } = useTranslation();

	const { data, isLoading, isError, error } = useQuery(
		"ïd",
		async () => await fetchGetInvestorPFById(userDataPF?._id, token),
		{
			onError: (error) => {
				console.error("Erro ao buscar investimento:", error);
			},
		}
	);
	const { register, handleSubmit, reset } = useForm();

	const [isDisabled] = useState(true);
	const [value, setValue] = useState("1");

	const [equityRegime, setEquityRegime] = useState<string>("");

	const [defaultMaritalStatus, setDefaultMaritalStatus] = useState<string>();
	const [defaultEquityEegimeStatus, setDefaultEquityEegimeStatus] =
		useState<string>();

	const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>();
	const [isMarried, setIsMarried] = useState<boolean>(
		isLoading ? null : data?.data?.marital_status?.status === "Casado(a)"
	);

	useMemo(() => {
		if (!isLoading && selectedMaritalStatus === "Casado(a)") {
			setIsMarried(true);
		}
		if (!isLoading && selectedMaritalStatus !== "Casado(a)") {
			setIsMarried(false);
		}
	}, [isLoading, selectedMaritalStatus]);

	useMemo(() => {
		if (!isLoading) {
			setDefaultMaritalStatus(data?.data?.marital_status?.status);
			setDefaultEquityEegimeStatus(data?.data?.marital_status?.equity_regime);
		} else {
			("");
		}
	}, [
		data?.data?.marital_status?.equity_regime,
		data?.data?.marital_status?.status,
		isLoading,
	]);

	const onSubmitForm = async (data: any) => {
		let request: UserDataPF;
		let value: MaritalStatus;

		console.log(data, "data");

		// eslint-disable-next-line prefer-const
		if (selectedMaritalStatus === "Casado(a)") {
			value = {
				status: selectedMaritalStatus,
				equity_regime: equityRegime,
				partners_name: data?.partners_name,
				partners_cpf: data?.partners_cpf,
				partners_rg: data?.partners_rg,
				partners_address: data?.partners_address,
			};
		} else if (selectedMaritalStatus === "União Estável") {
			value = {
				status: selectedMaritalStatus,
				partners_name: data?.spouses_name,
				partners_cpf: data?.spouses_cpf,
				partners_rg: data?.spouses_rg,
				partners_address: data?.spouses_address,
			};
		} else {
			value = {
				status: selectedMaritalStatus,
				partners_name: "",
				partners_cpf: "",
				partners_rg: "",
				partners_address: "",
			};
		}

		console.log(value, "value");

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
					if (props?.isCheckout) {
						window.location.reload();
					}
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
	useMemo(() => {
		reset({
			partners_name: "",
			partners_cpf: "",
			partners_rg: "",
			partners_address: "",
			spouses_name: "",
			spouses_cpf: "",
			spouses_rg: "",
			spouses_address: "",
		});
	}, [reset, selectedMaritalStatus]);

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
										defaultValue={data?.data?.full_name}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.city") as string}
										type="text"
										{...register("city_of_birth")}
										defaultValue={data?.data?.city_of_birth}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("register.birthDate") as string}
										type="date"
										{...register("birthday_date")}
										defaultValue={
											data?.data
												? new Date(data?.data?.birthday_date)
														.toISOString()
														.split("T")[0]
												: ""
										}
										maskType={"data"}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("register.socialNumber") as string}
										type="text"
										maskType={"CPF"}
										{...register("cpf")}
										defaultValue={formatCPF(data?.data?.cpf)}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.rg") as string}
										type="text"
										{...register("rg")}
										defaultValue={data?.data?.rg}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.address") as string}
										type="text"
										{...register("address")}
										defaultValue={data?.data?.address}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.occupation") as string}
										type="text"
										{...register("profession")}
										defaultValue={data?.data?.profession}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.email") as string}
										type="email"
										{...register("email")}
										defaultValue={data?.data?.email}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.phone") as string}
										type="text"
										maskType={"Telefone"}
										{...register("contact_number")}
										defaultValue={formatPhoneNumber(data?.data?.contact_number)}
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
									{...register("status")}
									defaultValue={defaultMaritalStatus}
									setData={setSelectedMaritalStatus}
									data={selectedMaritalStatus}
								/>
								<Collapse in={isMarried}>
									<SelectComponent
										defaultValue={defaultEquityEegimeStatus}
										setData={setEquityRegime}
										label={t("editProfile.regimePatrimonial") as string}
										type="regime_patrimonial"
										selectValue={estadosRegimesPatrimoniais}
										data={equityRegime}
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
										{...register("partners_name")}
										defaultValue={data?.data?.marital_status?.partners_name}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spouseSocialNumber") as string}
										type="text"
										maskType={"CPF"}
										{...register("partners_cpf")}
										defaultValue={formatCPF(
											data?.data?.marital_status?.partners_cpf
										)}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spousesRG") as string}
										type="text"
										{...register("partners_rg")}
										defaultValue={data?.data?.marital_status?.partners_rg}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.spousesAddress") as string}
										type="text"
										{...register("partners_address")}
										defaultValue={data?.data?.marital_status?.partners_address}
									/>
								</Collapse>
								<Collapse in={selectedMaritalStatus === "União Estável"}>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersName") as string}
										type="text"
										{...register("spouses_name")}
										defaultValue={data?.data?.marital_status?.partners_name}
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
										{...register("spouses_cpf")}
										defaultValue={formatCPF(
											data?.data?.marital_status?.partners_cpf
										)}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersRG") as string}
										type="text"
										{...register("spouses_rg")}
										defaultValue={data?.data?.marital_status?.partners_rg}
									/>
									<InputComponent
										placeholderText={t("inputs.insertHere") as string}
										label={t("editProfile.partnersAddress") as string}
										type="text"
										{...register("spouses_address")}
										defaultValue={data?.data?.marital_status?.partners_address}
									/>
								</Collapse>
							</Flex>
						</Flex>

						{props?.isCheckout && (
							<Checkbox mt={"1.5rem"} mb={"2rem"}>
								<Text fontSize={"0.875rem"} color={"#2D3748"}>
									Declaro que estou em união estável.
								</Text>
							</Checkbox>
						)}
						{props?.isCheckout && (
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
