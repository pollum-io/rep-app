import {
	Flex,
	Img,
	Text,
	useDisclosure,
	useMediaQuery,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { MenuInputs } from "../../components";
import { OpportunitiesCards } from "../../components";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { CreateAccountModal } from "../../components/CreateAccount/CreateAccountModal";
import { UserDataPJ } from "../../dtos/UserPJ";
import { UserDataPF } from "../../dtos/UserPF";
import PersistentFramework from "../../utils/persistent";

interface UserData {
	token: string;
	investor_pj?: string;
	investor_pf?: string;
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
}

export const OpportunitiesContainer: FunctionComponent<UserData> = (
	props: UserData
) => {
	const { getUserInfos } = useUser();
	const [bannerRes] = useMediaQuery("(max-width: 1110px)");
	const { t } = useTranslation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		getUserInfos(
			props?.investor_pf === null ? props?.investor_pj : props?.investor_pf,
			props?.token
		);
	}, [
		getUserInfos,
		props.token,
		props?.investor_pj,
		props?.investor_pf,
		onOpen,
	]);

	useEffect(() => {
		const pops = PersistentFramework.get("popUp");

		if (props?.investor_pf && pops === true) {
			onOpen();
			return;
		}

		if (props?.investor_pj && pops === true) {
			onOpen();
			return;
		}
	}, [
		onOpen,
		props?.investor_pf,
		props?.investor_pj,
		props?.userDataPF?.is_profile_filled,
		props?.userDataPJ?.is_profile_filled,
	]);

	return (
		<DefaultTemplate>
			<Flex
				flexDirection="column"
				bgColor="#ffffff"
				mb="11.0625rem"
				justifyContent="center"
			>
				<CreateAccountModal
					isOpen={isOpen}
					onClose={onClose}
					userId={props?.investor_pf ? props?.investor_pf : props?.investor_pj}
					token={props.token}
					investorPF={props?.userDataPF}
					investorPJ={props?.userDataPJ}
				/>
				<Flex w="100%">
					<Flex w="100%">
						<Img w="100%" h="21.3125rem" src="images/backgrounds/marble.png" />
						<Flex
							w="100%"
							h="21.3125rem"
							background="linear-gradient(91.4deg, #BBA1FF 40.04%, #E3FCFC 140.32%)"
							mixBlendMode="multiply"
							transform="matrix(-1, 0, 0, 1, 0, 0)"
							position="absolute"
						/>
					</Flex>
					<Flex
						w="100%"
						h="21.3125rem"
						position="absolute"
						gap={bannerRes ? "unset" : ["unset", "unset", "5%", "5%"]}
						justifyContent={
							bannerRes
								? "space-between"
								: ["unset", "unset", "center", "center"]
						}
						px={["", "", "", "1rem", "unset"]}
					>
						<Flex position="relative" alignItems="center">
							<Img
								w="max-content"
								h="100%"
								src="images/backgrounds/woman.png"
								position="absolute"
								zIndex="base"
								left="6rem"
							/>
							<Text
								w="18rem"
								fontFamily="Poppins"
								fontWeight="600"
								fontSize="2.25rem"
								lineHeight="2.5rem"
								mr="5rem"
								color="#FFFFFF"
								zIndex="docked"
								mt="2.5rem"
							>
								{t("opportunities.investingIs")}
							</Text>
						</Flex>
						<Flex
							h="21.3125rem"
							alignItems="center"
							w={["unset", "unset", "unset", "unset", "50%"]}
							maxWidth="47rem"
						>
							<Flex justifyContent="space-between" w="100%" gap="1.5rem">
								<Flex flexDirection="column" gap="0.625rem">
									<Img src="images/firstIcon.png" w="2.2rem" h="2.8rem" />
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.first")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem">
									<Img src="images/secondIcon.png" w="2.2rem" h="2.8rem" />
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.second")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem">
									<Img src="images/thirdIcon.png" w="2.2rem" h="2.8rem" />
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="7.5625rem"
									>
										{t("opportunities.third")}
									</Text>
								</Flex>
								<Flex flexDirection="column" gap="0.625rem" pt="0.2rem">
									<Img src="images/checkIcon.png" w="2.8rem" h="2.6rem" />
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
										color="#FFFFFF"
										w="11.125rem"
									>
										{t("opportunities.fourth")}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					px="1.5rem"
					mt="2.9375rem"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Flex
						alignItems={[
							"unset",
							"unset",
							"unset",
							"start",
							"center",
							"center",
						]}
						flexWrap="wrap"
						gap="1.5rem"
						flexDirection={["unset", "unset", "unset", "column", "row", "row"]}
						fontFamily="Poppins"
					>
						<Text fontSize="0.875rem" lineHeight="1.25rem" color="#2D3748">
							{t("opportunities.orderBy")}
						</Text>

						<Flex
							alignItems={[
								"unset",
								"unset",
								"unset",
								"start",
								"center",
								"center",
							]}
							flexWrap="wrap"
							gap="1.9375rem"
							flexDirection={[
								"unset",
								"unset",
								"unset",
								"column",
								"row",
								"row",
							]}
						>
							<MenuInputs />
							{/* <Text fontSize="0.875rem" lineHeight="1.25rem" color="#2D3748">
								1 resultados
							</Text> */}
						</Flex>
					</Flex>
					<Flex mt="2.9375rem" w="100%" justifyContent="center">
						<OpportunitiesCards
							investorId={props?.investor_pf}
							token={props.token}
						/>
					</Flex>
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
