import React, { useState } from "react";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fetchGetDocumentLinks } from "../../../services/fetchGetDocumentLinks";

type ComponentProps = {
	document?: string;
	isPending?: boolean;
	token?: string;
	documentKey: string;
};

const MotionFlex = motion(Flex);

export const ContratoComponent: React.FC<ComponentProps> = ({
	document,
	isPending,
	token,
	documentKey,
}) => {
	const [docDownload, setDocDownload] = useState();

	const getDocLinks = async (status: string) => {
		const req = await fetchGetDocumentLinks(token, documentKey);
		if (status === "baixar") {
			setDocDownload(req?.original_file_url);
			window.open(req?.original_file_url);
		} else {
			window.open(req?.signed_file_url, "_blank");
		}
	};

	return (
		<Flex mb={"2rem"} flexDir={"column"} w={"100%"}>
			<Text
				color={"#171923"}
				fontWeight={"600"}
				fontSize={"1.5rem"}
				mb={"2rem"}
			>
				Contrato
			</Text>
			<Flex flexDir={"column"} width={"100%"} mr={"3.4rem"}>
				<Flex flexDir={"column"} gap="0.5rem">
					<MotionFlex
						alignItems={"center"}
						bgColor={"#F7FAFC"}
						px={"1rem"}
						py={"0.5rem"}
						borderRadius={"0.75rem"}
						w={"100%"}
						initial="hidden"
						animate="visible"
						justifyContent="space-between"
					>
						<Flex alignItems={"center"} gap={"1.5rem"}>
							<Img src={"/icons/folder.svg"} />
							<Text fontSize={"0.875rem"} color={"#171923"} fontWeight={"400"}>
								SCP Modelo
							</Text>
						</Flex>
						<Flex gap={"1.5rem"}>
							<Button
								borderRadius={"0.5rem"}
								border="1px solid #007D99"
								bgColor={"transparent"}
								fontWeight={"500"}
								p={"0.5rem 3.75rem"}
								h={"max"}
								color={"#007D99"}
								onClick={() => getDocLinks("visualizar")}
							>
								Visualizar
							</Button>
							{isPending ? (
								<Button
									as={"a"}
									href={document}
									target="_blank"
									borderRadius={"0.5rem"}
									border="1px solid #007D99"
									bgColor={"#007D99"}
									p={"0.5rem 3.75rem"}
									h={"max"}
									color="white"
									fontWeight={"500"}
								>
									Assinar
								</Button>
							) : (
								<Button
									borderRadius={"0.5rem"}
									border="1px solid #007D99"
									bgColor={"transparent"}
									p={"0.5rem 3.75rem"}
									as={"a"}
									h={"max"}
									fontWeight={"500"}
									color={"#007D99"}
									href={docDownload}
									onClick={() => getDocLinks("baixar")}
									cursor={"pointer"}
								>
									Baixar
								</Button>
							)}
						</Flex>
					</MotionFlex>
				</Flex>
			</Flex>
		</Flex>
	);
};
