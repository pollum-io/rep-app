import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const HeaderLinks: React.FC = () => {
	const { t } = useTranslation();

	const links = [
		{
			id: 1,
			name: "Visão geral",
			url: "/painel-de-controle",
		},
		{
			id: 2,
			name: "Empreendimentos",
			url: "/empreendimentos",
		},
		{
			id: 3,
			name: "Repasses financeiros",
			url: "/empresas",
		},
		{
			id: 4,
			name: "Meu perfil",
			url: "/saibamais",
		},
	];

	const { pathname, push } = useRouter();

	return (
		<Flex gap="8">
			{links.map((item) => (
				<Flex
					key={item.id}
					w="max"
					justifyContent="center"
					transition="0.4s"
					borderBottom={
						pathname === item.url ? "2px solid #FFF" : "2px solid transparent"
					}
					mt="2"
					pb="2"
					color={pathname === item.url ? "#FFF" : "#B1D8DF"}
					_hover={{
						opacity: 0.7,
						cursor: "pointer",
					}}
					onClick={() => push(item.url)}
				>
					<Text fontSize={"sm"} fontWeight="medium">
						{item.name}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};
