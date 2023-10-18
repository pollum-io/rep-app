import React from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCreateCompanieSteps } from "../../hooks/useCreateCompanieSteps";

const sideBarLinks = [
	{
		id: 1,
		logo: "/logos/painel-geral-logo.svg",
		name: "Painel geral",
		path: "/painel-geral",
	},
	{ id: 2, logo: "/logos/contas-logo.svg", name: "Contas", path: "/contas" },
	{
		id: 3,
		logo: "/logos/empresas-logo.svg",
		name: "Empresas",
		path: "/empresas",
	},
	{
		id: 4,
		logo: "/logos/oportunidades-logo.svg",
		name: "Oportunidades",
		path: "/oportunidades",
	},
];

export const Sidebar: React.FC = () => {
	const router = useRouter();
	const { isCreatePage, setFirstStep, setSecondStep, setIsCreatePage } =
		useCreateCompanieSteps();
	return (
		<Flex
			position={"fixed"}
			h={"96.5%"}
			w={"13.125rem"}
			bgColor={"#ffffff"}
			px={"1rem"}
			py={"1.5rem"}
			borderRadius={"1.875rem"}
			boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
			flexDir={"column"}
			fontFamily={"Poppins"}
		>
			<Flex
				flexDir={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				w={"100%"}
				gap={"0.25rem"}
				mb={"2.75rem"}
			>
				<Flex gap={"0.7031rem"}>
					<Img src={"/logos/livntext.svg"} />
					<Img src={"/logos/livn.svg"} />
				</Flex>
				<Flex>
					<Text fontSize={"0.875rem"} color={"#1789A3"}>
						ADMIN
					</Text>
				</Flex>
			</Flex>
			{sideBarLinks?.map((data) => (
				<Link key={data?.id} href={data?.path}>
					<Flex
						key={data?.id}
						gap={"0.75rem"}
						mb={"0.5rem"}
						py={"0.5rem"}
						px={"1rem"}
						cursor={"pointer"}
						bgColor={router.pathname === data?.path ? "#E4F2F3" : "#FFF"}
						borderRadius={"2.5rem"}
						transition={"0.5s"}
						_hover={{ backgroundColor: "#E4F2F3" }}
						onClick={() => {
							setFirstStep(true);
							setSecondStep(false);
							setIsCreatePage(false);
						}}
					>
						<Img src={data?.logo} />
						<Text fontSize={"0.875rem"} color={"#007088"}>
							{data?.name}
						</Text>
					</Flex>
				</Link>
			))}
		</Flex>
	);
};
