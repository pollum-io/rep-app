import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";
import { useToasty } from "../../../hooks/useToasty";
import { fetchNewPassword } from "services";
import { IChangePasswordData } from "ui";

interface IChangePassword {
	token?: string;
}

export const ChangeEnterprisePasswordPage: React.FC<IChangePassword> = ({
	token,
}) => {
	const [showOldPassword, setShowOldPassword] = useState<boolean>(true);
	const [showPasswordInputOne, setShowPasswordInputOne] =
		useState<boolean>(true);
	const [showPasswordInputTwo, setShowPasswordInputTwo] =
		useState<boolean>(true);
	const [isButtonValid, setIsButtonValid] = useState<boolean>();
	const [firstPassword, setFirstPassword] = useState<string>();
	const [secondPassword, setSecondPassword] = useState<string>();
	const [buttonScore, setButtonScore] = useState<number>();

	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = useForm();
	const { toast } = useToasty();

	const onSubmitForm = async (data: IChangePasswordData) => {
		let request: IChangePasswordData;
		// eslint-disable-next-line prefer-const
		request = {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		};

		await fetchNewPassword(request, token);
		if (isSubmitSuccessful) {
			toast({
				id: "toast-edit",
				position: "top-right",
				status: "success",
				title: t("editProfile.toastTitlePasswordSuc"),
				description: t("editProfile.toastDescriptionPasswordSuc"),
			});
		} else {
			toast({
				id: "toast-edit",
				position: "top-right",
				status: "error",
				title: t("editProfile.toastTitlePasswordErr"),
				description: t("editProfile.toastDescriptionPasswordErr"),
			});
		}
	};

	useMemo(() => {
		if (buttonScore < 2 || firstPassword !== secondPassword) {
			setIsButtonValid(false);
		} else {
			setIsButtonValid(true);
		}
	}, [buttonScore, firstPassword, secondPassword]);

	return (
		<Flex w="100%" justifyContent="center" mt={"6.75rem"} mb="19.0625rem">
			<Flex flexDirection="column" gap="2.75rem">
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Flex>
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
								<Flex fontWeight="semibold" mb="0.5rem" mt="1.5rem">
									<Text
										as="span"
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color={"#2D3748"}
									>
										{t("forgotPassword.currentPassword")}
									</Text>
								</Flex>
								<InputGroup>
									<Input
										w={"18.5rem"}
										placeholder={"Digite aqui"}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										type={showOldPassword ? "password" : "text"}
										{...register("oldPassword")}
									/>
									<InputRightElement
										display={"flex"}
										onClick={() => setShowOldPassword(!showOldPassword)}
										alignItems="center"
										_hover={{ cursor: "pointer" }}
										pb="0.55rem"
									>
										{showOldPassword ? (
											<AiOutlineEyeInvisible size={25} color="#2D3748" />
										) : (
											<AiOutlineEye size={25} color="#2D3748" />
										)}
									</InputRightElement>
								</InputGroup>
								<Flex fontWeight="semibold" mb="0.5rem" mt="1.5rem">
									<Text
										as="span"
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color={"#2D3748"}
									>
										{t("forgotPassword.newPassword")}
									</Text>
								</Flex>
								<InputGroup>
									<Input
										w={"18.5rem"}
										placeholder={"Digite aqui"}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										type={showPasswordInputOne ? "password" : "text"}
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										onChange={(e) => setFirstPassword(e.target.value)}
									/>
									<InputRightElement
										display={"flex"}
										onClick={() =>
											setShowPasswordInputOne(!showPasswordInputOne)
										}
										alignItems="center"
										_hover={{ cursor: "pointer" }}
										pb="0.55rem"
									>
										{showPasswordInputOne ? (
											<AiOutlineEyeInvisible size={25} color="#2D3748" />
										) : (
											<AiOutlineEye size={25} color="#2D3748" />
										)}
									</InputRightElement>
								</InputGroup>
								<Flex fontWeight="semibold" mb="0.5rem" mt="1.5rem">
									<Text
										as="span"
										fontStyle="normal"
										fontWeight="500"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										color={"#2D3748"}
									>
										{t("forgotPassword.confirmPassword")}
									</Text>
								</Flex>
								<InputGroup>
									<Input
										w={"18.5rem"}
										placeholder={t("forgotPassword.typeHere") as string}
										_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
										border="0.0938rem solid #E2E8F0"
										type={showPasswordInputTwo ? "password" : "text"}
										_hover={{}}
										fontStyle="normal"
										fontWeight="400"
										fontSize="0.875rem"
										lineHeight="1.25rem"
										borderRadius="0.375rem"
										h="2rem"
										pl="0.7rem"
										color="#2D3748"
										{...register("newPassword")}
										onChange={(e) => setSecondPassword(e.target.value)}
									/>
									<InputRightElement
										display={"flex"}
										onClick={() =>
											setShowPasswordInputTwo(!showPasswordInputTwo)
										}
										alignItems="center"
										_hover={{ cursor: "pointer" }}
										pb="0.55rem"
									>
										{showPasswordInputTwo ? (
											<AiOutlineEyeInvisible size={25} color="#2D3748" />
										) : (
											<AiOutlineEye size={25} color="#2D3748" />
										)}
									</InputRightElement>
								</InputGroup>
								<PasswordStrengthBar
									onChangeScore={(score) => setButtonScore(score)}
									minLength={8}
									password={firstPassword}
									scoreWords={["fraca", "fraca", "okay", "boa", "forte"]}
									shortScoreWord={"fraca"}
								/>
							</Flex>
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
							_hover={
								isButtonValid === false
									? { opacity: "0.3" }
									: { bgColor: "#171923" }
							}
							_active={{}}
							type="submit"
							isDisabled={isButtonValid === false}
						>
							{t("editProfile.saved") as string}
						</Button>
					</Flex>
				</form>
			</Flex>
		</Flex>
	);
};
