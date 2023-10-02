import {
	Flex,
	Text,
	Button,
	Img,
	Input,
	InputGroup,
	InputRightElement,
	ScaleFade,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FunctionComponent, useMemo, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import { useToasty } from "../../hooks/useToasty";
import { fetchCreatePassword } from "services";

interface ICreatPasswordData {
	code?: string;
	isValid?: boolean;
}

export const CreatePasswordContainer: FunctionComponent<ICreatPasswordData> = ({
	code,
}) => {
	const { push } = useRouter();
	const { t } = useTranslation();
	const emailPage = true;
	const [buttonScore, setButtonScore] = useState<number>();
	const [isButtonValid, setIsButtonValid] = useState<boolean>();
	const [firstPassword, setFirstPassword] = useState<string>();
	const [secondPassword, setSecondPassword] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [showPasswordInputOne, setShowPasswordInputOne] =
		useState<boolean>(true);
	const [showPasswordInputTwo, setShowPasswordInputTwo] =
		useState<boolean>(true);
	const { toast } = useToasty();

	useMemo(() => {
		if (buttonScore < 2 || firstPassword !== secondPassword) {
			setIsButtonValid(false);
		} else {
			setPassword(secondPassword);
			setIsButtonValid(true);
		}
	}, [buttonScore, firstPassword, secondPassword]);

	const handleVerifyPasswordChange = async () => {
		await fetchCreatePassword({ password, code });

		toast({
			id: "toast-login-suc",
			position: "top-right",
			status: "success",
			title: "Senha criada com sucesso!",
			description: "",
		});

		push("/registrar");
	};

	return (
		<Flex
			bgColor="#ffffff"
			width="100vw"
			height="100vh"
			justifyContent="center"
			alignItems="center"
		>
			<ScaleFade in={emailPage}>
				<Flex
					flexDirection="column"
					w="20rem"
					justifyContent="center"
					fontFamily="Poppins"
				>
					<Flex flexDirection="column" gap="0.625rem">
						<Img
							w="max-content"
							h="max-content"
							src="images/backgrounds/LivnLogo.png"
						/>
						<Text
							color="#1789A3"
							fontSize="0.875rem"
							fontWeight="normal"
							lineHeight="150%"
							fontStyle="normal"
						>
							Criar senha
						</Text>
					</Flex>
					<Flex id="Insert new password" flexDirection="column" mt="1rem">
						<Flex flexDirection="column" gap="0.5rem">
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								color="#2D3748"
								display={"flex"}
							>
								{t("forgotPassword.newPassword") as string}
							</Text>
							<InputGroup size="md">
								<Input
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
									onClick={() => setShowPasswordInputOne(!showPasswordInputOne)}
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
							<Text
								fontWeight={"400"}
								fontSize={"xs"}
								color={"rgba(0, 0, 0, 0.36)"}
							>
								{t("forgotPassword.mustHave") as string}
							</Text>
						</Flex>
						<Flex flexDirection="column" gap="0.5rem" mt={"1.5rem"}>
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								color="#2D3748"
								display={"flex"}
							>
								{t("forgotPassword.confirmPassword") as string}
							</Text>
							<InputGroup size="md">
								<Input
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
									onChange={(e) => setSecondPassword(e.target.value)}
								/>
								<InputRightElement
									display={"flex"}
									onClick={() => setShowPasswordInputTwo(!showPasswordInputTwo)}
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
								onChangeScore={(score, feedback) => setButtonScore(score)}
								minLength={8}
								password={firstPassword}
								scoreWords={["fraca", "fraca", "okay", "boa", "forte"]}
								shortScoreWord={"fraca"}
							/>
						</Flex>
						<Button
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							mt={"2rem"}
							color="#FFFFFF"
							border="none"
							borderRadius="0.5rem"
							w="100%"
							h="2.2rem"
							bgColor="#1789A3"
							_hover={{
								cursor: "pointer",
								bgColor: "#007D99",
								boxShadow:
									"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
							}}
							isDisabled={isButtonValid === false}
							onClick={() => handleVerifyPasswordChange()}
						>
							{t("forgotPassword.continue") as string}
						</Button>
					</Flex>
				</Flex>
			</ScaleFade>
		</Flex>
	);
};
