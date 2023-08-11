import { Button, Flex } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useTranslation } from "react-i18next";
import { ChangePassword } from "../../components/EditProfile/Pages/ChangePassword";
import { PersonalDataComponent } from "../../components/EditProfile/Pages/PersonalDataComponent";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { useUser } from "../../hooks/useUser";
import { UserInfo } from "../../dtos/GlobalUserInfo";

interface IEditProfile {
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	user: UserInfo;
	token?: string;
}

export const Edit_ProfileContainer: FunctionComponent<IEditProfile> = (
	props
) => {
	const { userDataPF, userDataPJ, token } = props;
	const [pagePath, setPagePath] = useState("personal");
	const { t } = useTranslation();
	const { getUserInfos } = useUser();

	useEffect(() => {
		getUserInfos(
			props?.user?.investor_pf === null
				? props?.user?.investor_pj
				: props?.user?.investor_pf
		);
	}, [getUserInfos, props?.user?.investor_pf, props?.user?.investor_pj]);

	return (
		<DefaultTemplate>
			<Flex
				w="100%"
				alignItems="center"
				justifyContent="center"
				px={["unset", "unset", "2rem", "5rem"]}
				pt="6.25rem"
				pb="7rem"
			>
				<Flex
					w="100%"
					maxWidth="70rem"
					justifyContent="space-between"
					gap={["unset", "unset", "2rem", "2rem", "2rem"]}
				>
					<Flex flexDir={"column"}>
						<Button
							w="8.4375rem"
							h="2.25rem"
							borderRadius="0rem"
							bgColor="transparent"
							borderLeft={
								pagePath === "personal" ? "0.125rem solid #007D99" : "none"
							}
							color={pagePath === "personal" ? "#007D99" : "#4A5568"}
							_hover={{ color: "#007D99" }}
							_active={{}}
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							onClick={() => setPagePath("personal")}
						>
							{t("register.personalData")}
						</Button>
						<Button
							w="8.4375rem"
							h="2.25rem"
							borderRadius="0rem"
							bgColor="transparent"
							borderLeft={
								pagePath === "change-password"
									? "0.125rem solid #007D99"
									: "none"
							}
							color={pagePath === "change-password" ? "#007D99" : "#4A5568"}
							_hover={{ color: "#007D99" }}
							_active={{}}
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="0.875rem"
							lineHeight="1.25rem"
							onClick={() => setPagePath("change-password")}
						>
							Alterar senha
						</Button>
					</Flex>
					{pagePath === "personal" && (
						<PersonalDataComponent
							token={token}
							userDataPF={userDataPF}
							userDataPJ={userDataPJ}
						/>
					)}
					{pagePath === "change-password" && <ChangePassword token={token} />}
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
