import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import {
	ImovelAportesPage,
	ImovelHomePage,
	ImovelOverviewPage,
	ImovelTechnicalDetailPage,
	UserLogin,
} from "ui";
import {
	Collections,
	MoreAbout,
	OportunitiesNavBar,
} from "ui/Imovel/SharedComponents";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";
import { useOpportunities } from "../../hooks/useOpportunities";
import { useRegisterSteps } from "../../hooks";

interface IImovelProps {
	imovelDetails: IOpportunitiesCard;
	usersId: UserLogin;
}

export const ImovelDetail: FunctionComponent<IImovelProps> = ({
	imovelDetails,
	usersId,
}) => {
	const [page, setPage] = useState("oportunidade");
	return (
		<Flex w={"100%"} maxW={"70rem"} margin={"0 auto"} justifyContent={"center"}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className="page-transition"
			>
				<Flex flexDir={"column"} alignItems="center">
					<OportunitiesNavBar page={page} setPage={setPage} />
					<Collections images={imovelDetails?.pictures_enterprise} />
					<Flex gap="0rem" flexDir={"column"}>
						<Flex flexDir={"column"}>
							{page === "oportunidade" && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.7 }}
									className="page-transition"
								>
									<ImovelHomePage
										imovelDetails={imovelDetails}
										usersId={usersId}
										cotas={cotas}
										setCotas={setCotas}
										setFirstStep={setFirstStep}
										setSecondStep={setSecondStep}
									/>
								</motion.div>
							)}
							{page === "detalhamento" && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.7 }}
									className="page-transition"
								>
									<ImovelTechnicalDetailPage
										imovelDetails={imovelDetails}
										usersId={usersId}
										cotas={cotas}
										setCotas={setCotas}
										setFirstStep={setFirstStep}
										setSecondStep={setSecondStep}
									/>{" "}
								</motion.div>
							)}
							{page === "aportes" && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.7 }}
									className="page-transition"
								>
									<ImovelAportesPage
										imovelDetails={imovelDetails}
										usersId={usersId}
										cotas={cotas}
										setCotas={setCotas}
										setFirstStep={setFirstStep}
										setSecondStep={setSecondStep}
									/>
								</motion.div>
							)}
							{page === "visao geral" && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.7 }}
									className="page-transition"
								>
									<ImovelOverviewPage
										imovelDetails={imovelDetails}
										usersId={usersId}
										cotas={cotas}
										setCotas={setCotas}
										setFirstStep={setFirstStep}
										setSecondStep={setSecondStep}
									/>
								</motion.div>
							)}
							<Flex w="100%" mb="4rem" mt="2rem" flexDir={"column"}>
								<Text
									fontSize={"1.5rem"}
									fontWeight={"600"}
									color={"#171923"}
									mb={"2rem"}
								>
									Conheça mais sobre essa oportunidade
								</Text>
								<MoreAbout page={page} setPage={setPage} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</motion.div>
		</Flex>
	);
};
