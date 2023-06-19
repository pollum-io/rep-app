import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FunctionComponent } from "react";
import { ICompaniesCard } from "./dto";

export const CompaniesCard: FunctionComponent<ICompaniesCard> = ({
	_id,
	enterprise_name,
	enterprise_info,
	enterprise_logo,
	opportunities_closed,
	opportunities_available,
	enterprise_banner,
}) => {
	const { push } = useRouter();
	const { t } = useTranslation();

	return (
		<Flex
			w="100%"
			flexDirection="column"
			bgColor="#FFFFFF"
			boxShadow="0rem 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1), 0rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.06)"
			borderRadius="0.75rem"
		>
			<Flex
				w="100%"
				background="linear-gradient(102.22deg, #ECECEC 65.27%, #FFFFFF 89.66%)"
				borderRadius="0.75rem"
				h="9.3125rem"
			>
				<Img
					borderRadius="0.75rem"
					w="100%"
					h="100%"
					src={`/api/file/${enterprise_banner}`}
				/>
			</Flex>
			<Flex
				gap="1.5rem"
				pr="1rem"
				pl="0.5rem"
				py="0.875rem"
				w="100%"
				borderBottomRadius="0.75rem"
			>
				<Flex w="6rem" position="relative">
					<Img src={`/api/file/${enterprise_logo}`} />
				</Flex>
				<Flex gap="0.375rem" flexDirection="column" w={"100%"}>
					<Text
						fontFamily="Poppins"
						fontWeight="600"
						fontSize="1.5rem"
						lineHeight="2rem"
						color="#171923"
						textTransform="uppercase"
					>
						{enterprise_name}
					</Text>
					<Flex
						justifyContent="space-between"
						alignItems="center"
						gap="4rem"
						w={"100%"}
					>
						<Flex gap="2.8125rem">
							{opportunities_available !== 0 && (
								<Flex gap="0.5rem" alignItems="baseline" fontFamily="Poppins">
									<Text fontSize="0.75rem" lineHeight="1rem" color="#718096">
										{t("companies.card.opportunities")}
									</Text>
									<Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
										{opportunities_available}
									</Text>
								</Flex>
							)}
							{opportunities_closed !== 0 && (
								<Flex gap="0.5rem" alignItems="baseline">
									<Text fontSize="0.75rem" lineHeight="1rem" color="#718096">
										{t("companies.card.closed")}
									</Text>
									<Text fontSize="1rem" lineHeight="1.5rem" color="#171923">
										{opportunities_closed}
									</Text>
								</Flex>
							)}
						</Flex>
						<Button
							w="10.125rem"
							h="1.5rem"
							border="0.0625rem solid #007D99"
							borderRadius="0.375rem"
							bgColor="#ffffff"
							fontFamily="Poppins"
							fontWeight="500"
							fontSize="0.75rem"
							lineHeight="1rem"
							color="#007D99"
							_hover={{ bgColor: "#EDF2F7" }}
							onClick={() =>
								push({
									pathname: `/empresa/`,
									query: { enterprise_id: `${_id}` },
								})
							}
						>
							{t("companies.card.learnMore")}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
