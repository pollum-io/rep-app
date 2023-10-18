import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface IHeaderLinks {
	isDrawer?: boolean;
}

export const HeaderLinks: React.FC<IHeaderLinks> = ({ isDrawer }) => {
	const { t } = useTranslation();

	const links = [
		{
			id: 1,
			name: isDrawer ? "Oportunidades" : t("companieDetails.opportunities"),
			url: "/oportunidades",
		},
		{
			id: 2,
			name: isDrawer ? "Meus investimentos" : "Meus investimentos",
			url: "/meus-investimentos",
		},
		{
			id: 3,
			name: isDrawer ? "Empresas" : t("header.companies"),
			url: "/empresas",
		},
		// {
		// 	id: 4,
		// 	name: t("companies.card.learnMore"),
		// 	url: "/saibamais",
		// },
	];

	const { pathname, push } = useRouter();

	return (
		<Flex gap="8">
			{links.map((item) => (
				<Flex
					key={item.id}
					w="max"
					justifyContent="center"
					transition="0.14s"
					borderBottom={
						pathname === item.url
							? "2px solid #007D99"
							: "2px solid transparent"
					}
					mt="2"
					pb="2"
					color={pathname === item.url ? "#007D99" : "#4A5568"}
					_hover={{
						color: "#007D99",
						cursor: "pointer",
					}}
					onClick={() => (isDrawer ? "" : push(item.url))}
				>
					<Text fontSize={"sm"} fontWeight="medium">
						{item.name}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};
