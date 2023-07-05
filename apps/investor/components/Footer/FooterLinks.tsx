import { Flex, Text } from "@chakra-ui/react";

// const links = [
// 	{
// 		id: 1,
// 		name: "Oportunidades",
// 		url: "/oportunidades",
// 	},
// 	{
// 		id: 2,
// 		name: "Portfólio",
// 		url: "/portfolio",
// 	},
// 	{
// 		id: 3,
// 		name: "Empresas",
// 		url: "/empresas",
// 	},
// 	{
// 		id: 4,
// 		name: "Saiba mais",
// 		url: "/saibamais",
// 	},
// ];

const mocked = [
	{
		id: 1,
		name: "Sem texto",
	},
	{
		id: 2,
		name: "Sem texto",
	},
	{
		id: 3,
		name: "Sem texto",
	},
	{
		id: 4,
		name: "Sem texto",
	},
];

export const FooterLinks: React.FC = () => {
	return (
		<Flex gap="10.6875rem" color="white">
			<Flex flexDir={"column"}>
				<Text fontSize={"sm"} fontWeight="600" pb="0.875rem">
					Titulo
				</Text>
				{mocked.map((item) => (
					<Flex key={item.id} pb="0.5rem">
						<Text fontSize={"sm"} fontWeight="400">
							{item.name}
						</Text>
					</Flex>
				))}
			</Flex>
			<Flex flexDir={"column"}>
				<Text fontSize={"sm"} fontWeight="600" pb="0.875rem">
					Titulo
				</Text>
				{mocked.map((item) => (
					<Flex key={item.id} pb="0.5rem">
						<Text fontSize={"sm"} fontWeight="400">
							{item.name}
						</Text>
					</Flex>
				))}
			</Flex>
			<Flex flexDir={"column"}>
				<Text fontSize={"sm"} fontWeight="600" pb="0.875rem">
					Titulo
				</Text>
				{mocked.map((item) => (
					<Flex key={item.id} pb="0.5rem">
						<Text fontSize={"sm"} fontWeight="400">
							{item.name}
						</Text>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};
