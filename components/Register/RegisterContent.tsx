import React, { FunctionComponent, useMemo, useState } from "react";
import {
	Flex,
	Checkbox,
	Button,
	Text,
	SlideFade,
	ScaleFade,
	InputGroup,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { useRegister } from "../../hooks/useRegister";
import { useToasty } from "../../hooks/useToasty";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiCheckFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { fetchChangePassword } from "../../services/fetchChangePassword";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";

export const RegisterContent: FunctionComponent<any> = props => {
	const { token } = props;
	const emailPage = true;
	const [buttonScore, setButtonScore] = useState<any>();
	const [isButtonValid, setIsButtonValid] = useState<any>();
	const [firstPassword, setFirstPassword] = useState<any>();
	const [secondPassword, setSecondPassword] = useState<any>();
	const [password, setPassword] = useState<any>();
	const [showPasswordInputOne, setShowPasswordInputOne] =
		useState<boolean>(true);
	const [showPasswordInputTwo, setShowPasswordInputTwo] =
		useState<boolean>(true);
	const isValid = true;
	const [canSend, setCanSend] = useState(false);

	const { firstStep, secondStep, setFirstStep, setSecondStep } = useRegister();

	const { push } = useRouter();
	const { toast } = useToasty();
	const { t } = useTranslation();

	useMemo(() => {
		if (buttonScore < 2 || firstPassword !== secondPassword) {
			setIsButtonValid(false);
		} else {
			setPassword(secondPassword);
			setIsButtonValid(true);
		}
	}, [buttonScore, firstPassword, secondPassword]);

	const handleVerifyPasswordChange = async () => {
		//TODO analisar isso
		if (isValid) {
			await fetchChangePassword("", password);
			toast({
				id: "toast-login-suc",
				position: "top-right",
				status: "success",
				title: t("register.passwordCreatedSuccessfully"),
			});
			push("/oportunidades");
		} else {
			toast({
				id: "toast-login-err",
				position: "top-right",
				status: "error",
				title: t("register.somethingWentWrong"),
			});
		}
	};

	return (
		<Flex w="100%" alignItems="center" justifyContent="center">
			{firstStep ? (
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
										setCanSend(!canSend), setSecondStep(secondStep);
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
									onClick={() => {
										setFirstStep(false), setSecondStep(true), setCanSend(false);
									}}
								>
									{t("register.next") as any}
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</SlideFade>
			) : (
				<SlideFade in={secondStep} offsetY="-30px">
					<Flex flexDirection="column" gap="1.625rem">
						<ScaleFade in={emailPage}>
							<Flex
								flexDirection="column"
								w="20rem"
								justifyContent="center"
								fontFamily="Poppins"
							>
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
											{t("register.password") as string}
										</Text>
										<InputGroup size="md">
											<Input
												placeholder={t("register.enterHere")}
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
												onChange={e => setFirstPassword(e.target.value)}
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
												onChange={e => setSecondPassword(e.target.value)}
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
											onChangeScore={(score, feedback) => setButtonScore(score)}
											minLength={8}
											password={firstPassword}
										/>
									</Flex>
								</Flex>
							</Flex>
						</ScaleFade>
					</Flex>
					<Flex
						flexDirection="column"
						fontFamily="Poppins"
						gap="2.125rem"
						mt={"1rem"}
					>
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
								}}
							>
								<BsArrowLeftShort size={22} />
								{t("register.back") as any}
							</Button>
							<Button
								mt="0.375rem"
								w="9.25rem"
								h="2rem"
								isDisabled={isButtonValid === false}
								justifyContent="center"
								padding="0.2188rem 1.25rem"
								alignItems="center"
								gap="0.5rem"
								bgColor="#2D3748"
								_hover={!canSend ? { opacity: "0.3" } : { bgColor: "#171923" }}
								fontFamily="Poppins"
								fontStyle="normal"
								fontWeight="500"
								fontSize="0.875rem"
								lineHeight="1.25rem"
								borderRadius="0.5rem"
								color="#ffffff"
								type="submit"
								onClick={handleVerifyPasswordChange}
							>
								{t("register.next") as string}
							</Button>
						</Flex>
					</Flex>
				</SlideFade>
			)}
		</Flex>
	);
};
