import React, { FunctionComponent, useMemo, useState } from "react";
import { Flex, Checkbox, Button, Text, SlideFade } from "@chakra-ui/react";
import { useRegister } from "../../hooks/useRegister";
import { useToasty } from "../../hooks/useToasty";
import { InputComponent } from "../Inputs/DeafultInput/InputComponent";
import { useForm } from "react-hook-form";
import {
	BsArrowRightShort,
	BsArrowLeftShort,
	BsCircleFill,
} from "react-icons/bs";
import { RiCheckFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { SelectComponent } from "../Select/SelectComponent";
import { brasilStates } from "./states";
import { useTranslation } from "react-i18next";
import { useQuery as query } from "react-query";
import { fetchCreateInvestorPF, fetchEnterprise, logout } from "../../services";
import { fetchCreateInvestorPJ } from "../../services/fetchCreateInvestorPJ";
import { useWallet } from "../../hooks/useWallet";

export const RegisterContent: FunctionComponent<any> = props => {
	const { token } = props;
	const [canSend, setCanSend] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState("");
	const [inputValuesUf, setInputValuesUf] = useState<any>();
	const {
		firstStep,
		secondStep,
		isPhysical,
		setFirstStep,
		setSecondStep,
		setIsPhysical,
	} = useRegister();
	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitSuccessful },
		reset,
		getValues,
	} = useForm();
	const { push } = useRouter();
	const { toast } = useToasty();
	const { t } = useTranslation();
	const { disconnectWallet } = useWallet();

	const userWhiteListed = async () => {
		//TODO
	};

	const onSubmitForm = async (data: any) => {
		const request = isPhysical
			? {
					full_name: String(data?.full_name),
					cpf: data?.cpf?.replace(/[.-]/g, ""),
					birthday_date: new Date(data?.birthday_date),
					is_legal_entity: isPhysical,
					invited_by: String(data?.invited_by),
			  }
			: {
					full_name: String(data?.enterprise_name),
					cnpj: data?.cnpj.replace(/[-./]/g, ""),
					uf: Object?.values(inputValuesUf)[0],
					is_legal_entity: isPhysical,
					invited_by: String(data?.invited_by),
			  };
		await (isPhysical
			? fetchCreateInvestorPF(request, token)
			: fetchCreateInvestorPJ(request, token)
		)
			.then(res => {
				if (res) {
					toast({
						id: "toast1",
						position: "top-right",
						status: "success",
						title: "Cadastro enviado com sucesso!",
						description:
							"Você receberá no e-mail informado mais informações em breve.",
					});
					push("/oportunidades");
				}
			})
			.catch(err => {
				console.log({ err });
			});
	};

	const handleClearInputs = () => {
		reset({
			full_name: "",
			enterprise_name: "",
			cpf: "",
			birthday_date: "",
			cnpj: "",
			uf: "",
			corporate_name: "",
		});
	};

	return (
		<Flex w="100%" alignItems="center" justifyContent="center">
			{firstStep && (
				<SlideFade in={firstStep} offsetY="-30px">
					<Flex flexDirection="column" gap="1.625rem">
						<Flex flexDirection="column" gap="0.5rem">
							<Flex>
								<Text
									fontFamily="Poppins"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									color="#2D3748"
								>
									{t("register.termsAnd") as any}
								</Text>
							</Flex>
							<Flex
								borderRadius="0.375rem"
								border="0.0625rem solid #E2E8F0"
								w="47.4375rem"
								h="17.75rem"
								padding="22px 22px 0 22px"
								mr="1rem"
							>
								<Flex
									id="scrollbar"
									overflowX="hidden"
									overflowY="auto"
									gap="1rem"
								>
									<Text
										color="#171923"
										fontFamily="Poppins"
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.75rem"
										lineHeight="1rem"
										textAlign="justify"
										mr="1.0625rem"
									>
										Lorem ipsum dolor sit amet consectetur. Pellentesque vel
										malesuada accumsan mattis quis elit lectus vitae. Ut aliquam
										pellentesque nascetur proin eget bibendum penatibus
										senectus. Quis turpis arcu maecenas viverra. Posuere semper
										duis morbi lobortis amet a. Adipiscing cursus in lectus
										tortor ullamcorper eget. Vitae diam quam et euismod. Eget
										sed metus est pharetra euismod est faucibus. Pharetra
										faucibus posuere volutpat cursus velit viverra vitae
										fringilla. Arcu consectetur viverra non tempus. Consequat
										faucibus tortor bibendum nisl enim accumsan id nec quis.
										Malesuada cursus donec nulla vel condimentum ut augue.
										Auctor venenatis malesuada ultrices diam enim integer vitae
										tincidunt adipiscing. Sed enim neque pellentesque lacus
										nunc. Vitae pellentesque eu in scelerisque. Faucibus quam in
										maecenas phasellus id tempus senectus molestie eros. Dolor
										nunc vivamus neque convallis vestibulum pellentesque urna.
										Massa proin amet iaculis elementum quisque enim. Adipiscing
										molestie imperdiet pellentesque arcu ultrices facilisi dolor
										phasellus. Velit vulputate lacus mauris senectus porta
										malesuada nibh sollicitudin sagittis. Adipiscing cursus in
										lectus tortor ullamcorper eget. Vitae diam quam et euismod.
										Eget sed metus est pharetra euismod est faucibus. Pharetra
										faucibus posuere volutpat cursus velit viverra vitae
										fringilla. Arcu consectetur viverra non tempus. Consequat
										faucibus tortor bibendum nisl enim accumsan id nec quis.
										Malesuada cursus donec nulla vel condimentum ut augue.
										Auctor venenatis malesuada ultrices diam enim integer vitae
										tincidunt adipiscing. eros. Dolor nunc vivamus neque
										convallis vestibulum pellentesque urna. Massa proin amet
										iaculis elementum quisque enim. Adipiscing molestie
										imperdiet pellentesque arcu ultrices facilisi dolor
										phasellus. Velit vulputate lacus mauris senectus porta
										malesuada nibh sollicitudin sagittis. Adipiscing cursus in
										lectus tortor ullamcorper eget. Vitae diam quam et euismod.
										Eget sed metus est pharetra euismod est faucibus. Pharetra
										faucibus posuere volutpat cursus velit viverra vitae
										fringilla. Arcu consectetur viverra non tempus. Consequat
										faucibus tortor bibendum nisl enim accumsan id nec quis.
										Malesuada cursus donec nulla vel condimentum ut augue.
										Auctor venenatis malesuada ultrices diam enim integer vitae
										tincidunt adipiscing.
									</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex flexDirection="column" fontFamily="Poppins" gap="2.125rem">
							<Flex gap="0.75rem">
								<Checkbox
									defaultChecked={false}
									spacing="0.75rem"
									variant="green"
									icon={<RiCheckFill size={20} />}
									borderColor="#E2E8F0"
									onChange={() => {
										setCanSend(!canSend), setSecondStep(!secondStep);
									}}
								/>
								<Text fontSize="0.875rem" lineHeight="1.25rem" color="#2D3748">
									{t("register.iAgree") as any}
								</Text>
							</Flex>
							<Flex gap="1.5rem">
								<Button
									mt="0.375rem"
									w="9.25rem"
									h="2rem"
									justifyContent="center"
									padding="0.2188rem 1.25rem"
									alignItems="center"
									gap="0.5rem"
									bgColor="transparent"
									border="1px solid #323841"
									color="#171923"
									_hover={{ bgColor: "#F7FAFC" }}
									fontFamily="Poppins"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									borderRadius="0.5rem"
									onClick={() => {
										setFirstStep(true), setSecondStep(false), setCanSend(false);
										push("/");
									}}
								>
									<BsArrowLeftShort size={22} />
									{t("register.back") as any}
								</Button>
								<Button
									mt="0.375rem"
									w="9.25rem"
									h="2rem"
									isDisabled={!canSend ? true : false}
									justifyContent="center"
									padding="0.2188rem 1.25rem"
									alignItems="center"
									gap="0.5rem"
									bgColor="#2D3748"
									_hover={
										!canSend ? { opacity: "0.3" } : { bgColor: "#171923" }
									}
									fontFamily="Poppins"
									fontStyle="normal"
									fontWeight="500"
									fontSize="0.875rem"
									lineHeight="1.25rem"
									borderRadius="0.5rem"
									color="#ffffff"
									type="submit"
									onClick={userWhiteListed}
								>
									{t("register.whitelist") as any}
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</SlideFade>
			)}
		</Flex>
	);
};
