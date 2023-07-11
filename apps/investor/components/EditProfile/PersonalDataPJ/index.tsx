import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";
import { useToasty } from "../../../hooks/useToasty";
import { InputComponent } from "../../Inputs/DeafultInput/InputComponent";
import { SelectComponent } from "../../Select/SelectComponent";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { brasilStates } from "../../Register/states";
import { UserDataPJ } from "../../../dtos/UserPJ";
import { fetchEditInvestorPJ } from "../../../services/fetchEditInvestorPJ";

interface IChangePassword {
	data?: UserDataPJ;
	token?: string;
}

type UfData = {
	uf: string;
};

export const PersonalDataPJ: React.FC<IChangePassword> = (props) => {
	const { data, token } = props;
	const [isDisabled] = useState(true);
	const [inputValuesUf, setInputValuesUf] = useState<UfData>();
	const { t } = useTranslation();
	const { register, handleSubmit } = useForm();
	const { userInfos } = useUser();
	const { toast } = useToasty();

	const onSubmitForm = async (data: UserDataPJ) => {
		let request: UserDataPJ;

		// eslint-disable-next-line prefer-const
		request = {
			full_name: data?.full_name,
			cnpj: data?.cnpj.replace(/[-./]/g, ""),
			uf: Object?.values(inputValuesUf)[0],
			email: data?.email,
			contact_number: data?.contact_number
				?.replace(/[^\w]/gi, "")
				?.replace(/\s+/g, ""),
			address: data?.address,
			isPerfilCompleted: true,
		};

		await fetchEditInvestorPJ(userInfos, request, token)
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
				console.log({ err });
			});
	};

	return (
		<Flex w="100%" justifyContent="end">
			<Flex flexDirection="column" gap="2.75rem" w="100%" maxWidth="47.4375rem">
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
									placeholderText="00.000.000/0000-00"
									label={t("register.nationalRegister") as string}
									maskType={"CNPJ"}
									type="text"
									{...register("cnpj")}
									defaultValue={data?.cnpj}
								/>
								<SelectComponent
									label={t("register.federal") as string}
									type="uf"
									selectValue={brasilStates}
									setInputValues={setInputValuesUf}
									{...register("uf")}
									defaultValue={
										typeof data?.uf === "object" ? data.uf.uf : data?.uf
									}
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
									{...register("phone_number")}
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
							<InputComponent
								placeholderText={t("inputs.insertHere") as string}
								label={t("editProfile.address") as string}
								type="text"
								{...register("address")}
								defaultValue={data?.address}
							/>
						</Flex>
					</Flex>
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
