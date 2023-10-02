import {
	Button,
	ButtonProps,
	Flex,
	Img,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { useToasty } from "../../hooks/useToasty";
import { fetchSignIn } from "services";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Login: FunctionComponent<ButtonProps> = () => {
	const { push } = useRouter();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const { getUserInfos } = useUser();
	const [showPassword, setShowPassword] = useState<boolean>(true);
	const { toast } = useToasty();

	const handleLogin = async () => {
		try {
			const data = await fetchSignIn(email, password);
			getUserInfos(
				data?.investor_pf === null ? data?.investor_pj : data?.investor_pf
			);
			// toast({
			// 	id: "toast-login-suc",
			// 	position: "top-right",
			// 	status: "success",
			// 	title: "Seja bem-vindo!",
			// });
			if (data?.investor_pf) {
				push("/oportunidades");
			} else if (data?.investor_pj) {
				push("/oportunidades");
			} else {
				push("/registrar");
			}
		} catch (error) {
			if (error instanceof Error) {
				toast({
					id: "toast-login-error",
					position: "top-right",
					status: "error",
					title: "Email ou senha incorretos!",
				});
				return;
			}
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	const { t } = useTranslation();

	return (
		<Flex
			bgColor="#ffffff"
			width="100vw"
			height="100vh"
			justifyContent="space-between"
		>
			<Flex
				flex="1"
				h="100vh"
				justifyContent="center"
				alignItems="center"
				fontFamily="Poppins"
			>
				<Flex flexDirection="column" w="22rem" justifyContent="center">
					<Flex flexDirection="column" gap="2">
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
							{t("login.liveInvesting")}
						</Text>
					</Flex>
					<Flex flexDirection="column" mt="1rem" gap="12px">
						<Text
							flexDirection="column"
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#2D3748"
						>
							E-mail
						</Text>
						<Input
							placeholder={t("login.placeholderEmail") as string}
							_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
							border="0.0938rem solid #E2E8F0"
							_hover={{}}
							_focus={{}}
							fontStyle="normal"
							fontWeight="400"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							borderRadius="0.375rem"
							h="2rem"
							pl="0.7rem"
							color="#2D3748"
							onChange={(e) => setEmail(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</Flex>
					<Flex flexDirection="column" mt="1.5rem" gap="0.75rem">
						<Flex justifyContent="space-between" alignItems="center">
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								color="#2D3748"
							>
								{t("login.password")}
							</Text>
							<Text
								flexDirection="column"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.75rem"
								lineHeight="1rem"
								color="#007D99"
								_hover={{ cursor: "pointer" }}
								onClick={() => push("/recuperar-senha")}
							>
								{t("login.forgot")}
							</Text>
						</Flex>{" "}
						<InputGroup size="md">
							<Input
								placeholder={t("login.placeholderSenha") as string}
								_placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
								border="0.0938rem solid #E2E8F0"
								_hover={{}}
								_focus={{}}
								fontStyle="normal"
								fontWeight="400"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								borderRadius="0.375rem"
								h="2rem"
								pl="0.7rem"
								color="#2D3748"
								onChange={(e) => setPassword(e.target.value)}
								type={showPassword ? "password" : "text"}
								onKeyPress={handleKeyPress}
							/>
							<InputRightElement
								display={"flex"}
								onClick={() => setShowPassword(!showPassword)}
								alignItems="center"
								_hover={{ cursor: "pointer" }}
								pb="0.55rem"
							>
								{showPassword ? (
									<AiOutlineEyeInvisible size={25} color="#7a7a7a" />
								) : (
									<AiOutlineEye size={25} color="#7a7a7a" />
								)}
							</InputRightElement>
						</InputGroup>
					</Flex>
					<Flex mt="2.5rem">
						<Button
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							color="#FFFFFF"
							border="none"
							borderRadius="0.5rem"
							w="100%"
							h="2.2rem"
							bgColor="#1789A3"
							onClick={handleLogin}
							_hover={{
								cursor: "pointer",
								bgColor: "#007D99",
								boxShadow:
									"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
							}}
						>
							Login
						</Button>
					</Flex>
					<Flex bgColor="#E2E8F0" h="0.0625rem" w="100%" mt="2rem" />
					<Flex
						justifyContent="center"
						alignItems="center"
						mt="1.5rem"
						gap="1rem"
					>
						<Text
							fontStyle="normal"
							fontWeight="normal"
							fontSize="0.75rem"
							lineHeight="150%"
							color="#2D3748"
						>
							{t("login.noAccount")}
						</Text>
						<Button
							fontStyle="normal"
							fontWeight="500"
							fontSize="0.75rem"
							lineHeight="1rem"
							color="#007D99"
							bg={"transparent"}
							_hover={{ opacity: 0.8 }}
							onClick={() => push("/create-account")}
						>
							{t("login.register")}
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Flex h="100%" justifyContent="flex-end" flex="1">
				<Img
					src="images/backgrounds/LoginBackground.png"
					h="100%"
					w="max-content"
				/>
			</Flex>
		</Flex>
	);
};
