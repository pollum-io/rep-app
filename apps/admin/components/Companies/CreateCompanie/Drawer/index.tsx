import React, { useRef } from "react";
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Text,
	Button,
} from "@chakra-ui/react";
import {
	CompanieContact,
	CompanieDetails,
	CompanieInfoInProgress,
	CompanieMembers,
	Header,
	ICompaniesTeam,
} from "ui";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";
import { fetchCreateEnterprise, fetchUploadImages } from "services";

interface IDrawerComponent {
	onClose: any;
	isOpen: any;
}

export const DrawerComponent: React.FC<IDrawerComponent> = ({
	isOpen,
	onClose,
}) => {
	const btnRef = useRef();
	const { companyFormData, setIsCreating, companyImages, isEditing } =
		useCreateCompany();

	const updatedCompanyFormData = { ...companyFormData };

	if (companyImages.logo) {
		updatedCompanyFormData.logo = companyImages.logo;
	}

	if (companyImages.banner) {
		updatedCompanyFormData.banner = companyImages.banner;
	}

	updatedCompanyFormData.companyMember.forEach((member, index) => {
		if (companyImages[index]) {
			member.image = URL.createObjectURL(companyImages[index]);
		}
	});

	const handleCreateCompany = async (data: any) => {
		let request: any;
		console.log(data, "data");
		const formData = new FormData();
		formData.append("logo", data?.logo);
		formData.append("banner", data?.banner);
		// data?.companyMember.forEach((teamMember, index) => {
		// 	formData.append("team", teamMember.image, `file${index}`);
		// });

		const retornoDasImagens = await fetchUploadImages(formData);

		//logo tem que ser no indice 0
		//banner é no indice 1, teria que verificar se o logo foi editado, se for editado o banner é indice 1, se nao no indice 0

		// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
		request = {
			...(data?.nome && { enterprise_name: data?.nome }),
			...(data?.logo && { enterprise_logo: retornoDasImagens[0] }),
			...(data?.banner && {
				enterprise_banner:
					data?.logo !== null ? retornoDasImagens[1] : retornoDasImagens[0],
			}),
			...(data?.cnpj.replace(/[-./]/g, "") && {
				cnpj: data?.cnpj.replace(/[-./]/g, ""),
			}),
			...(data?.contactPhone && { contact_number: data?.contactPhone }),
			...(Object.keys(data.social_media).length && {
				social_media: data.social_media,
			}),
			...(data?.description && { description: data?.description }),
			team: data?.companyMember,
			...(Object.keys(data.enterprise_info).length && {
				enterprise_info: data.enterprise_info,
			}),
		};
		//await fetchCreateEnterprise(request);
	};
	return (
		<>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size={"full"}
			>
				<DrawerOverlay />
				<DrawerContent
					w={"100%"}
					overflowY="scroll"
					overflowX="hidden"
					position={"relative"}
				>
					<Flex flexDir={"column"} mb={"10rem"}>
						<Flex
							justifyContent={"center"}
							w={"100vw"}
							h={"2.75rem"}
							bgImage={"linear-gradient(98deg, #BBA1FF 6.1%, #68E4FF 103.66%)"}
							px={"0.75rem"}
							py={"0.5rem"}
							alignItems={"center"}
						>
							<Text fontSize={"0.875rem"} color={"#fff"} fontWeight={"500"}>
								Este é apenas um preview da página da empresa da perscpetiva do
								investidor
							</Text>
						</Flex>
						<Header isDrawer={true} />
						<Flex flexDirection="column" gap="2rem" mt="6.25rem" mb="4.5rem">
							<Flex
								flexDirection="column"
								w="100%"
								px="5rem"
								justifyContent="center"
								alignItems="center"
							>
								<Flex w="100%" maxWidth="70rem">
									<Flex justifyContent="space-between" gap="2.75rem">
										<Flex flexDirection="column">
											<Flex>
												<CompanieDetails
													logo={
														companyImages?.logo
															? URL.createObjectURL(companyImages?.logo)
															: null
													}
													banner={
														companyImages?.banner
															? URL.createObjectURL(companyImages?.banner)
															: null
													}
													name={companyFormData?.nome}
													id={`CNPJ: ${companyFormData?.cnpj}`}
													location={companyFormData?.localizacao}
													description={companyFormData?.description}
												/>
											</Flex>
											<CompanieInfoInProgress
												delivered={
													companyFormData?.enterprise_info?.obrasEntregues
												}
												inProgress={
													companyFormData?.enterprise_info?.obrasAndamento
												}
												livnProp={3}
												vgv={companyFormData?.enterprise_info?.vgv}
											/>
											<Flex gap="5.75rem" mt="8.5rem">
												<Flex
													flexDirection="column"
													fontFamily="Poppins"
													fontWeight="600"
													fontSize="1.5rem"
													lineHeight="2rem"
													color="#171923"
												>
													<Text>Quem constrói nossa história</Text>

													<Flex>
														{updatedCompanyFormData?.companyMember?.map(
															(team: any, index: number) => (
																// eslint-disable-next-line react/jsx-key
																<CompanieMembers
																	key={index}
																	name={team.name}
																	occupation={team.position}
																	image={team.image}
																	isDrawer={true}
																/>
															)
														)}
													</Flex>
												</Flex>
											</Flex>
										</Flex>
										<Flex>
											<Flex h="100%">
												<CompanieContact
													website={companyFormData?.social_media?.website}
													whatsapp={companyFormData?.social_media?.whatsapp}
													telephone={
														companyFormData?.social_media?.contactPhone
													}
													email={companyFormData?.social_media?.contactEmail}
													instagram={companyFormData?.social_media?.instagram}
													twitter={companyFormData?.social_media?.twitter}
													facebook={companyFormData?.social_media?.facebook}
													telegram={companyFormData?.social_media?.telegram}
												/>
											</Flex>
										</Flex>
									</Flex>
								</Flex>
								<Flex
									mt="8.5rem"
									alignItems="center"
									flexDirection="column"
									gap="2rem"
									w="100%"
									maxWidth="70rem"
								>
									<Text
										fontFamily="Poppins"
										fontWeight="600"
										fontSize="1.5rem"
										lineHeight="2rem"
										color="#171923"
										w="100%"
									>
										Oportunidades
									</Text>
								</Flex>
							</Flex>
							<Flex px="1.5rem" w="100%" justifyContent="center">
								{/* <OpportunitiesCards
								id={companieDetail?._id}
								setFirstStep={setFirstStep}
								setCotas={setCotas}
								setSecondStep={setSecondStep}
							/> */}
								<Text color={"#171923"}>
									Em breve você poderá ver aqui todas as oportunidades LIVN
									cadastradas por esta empresa.
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</DrawerContent>
			</Drawer>
			{isOpen && (
				<Flex
					w={"33.0625rem"}
					px={"2.75rem"}
					py={"1.5rem"}
					position={"fixed"}
					bgColor={"#E4F2F3"}
					justifyContent={"space-between"}
					borderRadius={"1.875rem"}
					bottom={"10"}
					left={"38%"}
					zIndex={"9999999"}
				>
					<Button
						borderRadius={"100px"}
						border={"1px solid #007D99"}
						color={"#007D99"}
						bgColor={"transparent"}
						w={"max"}
						h={"2rem"}
						fontSize={"0.875rem"}
						fontWeight={"500"}
						onClick={onClose}
					>
						Voltar para edições
					</Button>
					<Button
						fontSize={"0.875rem"}
						fontWeight={"500"}
						color="white"
						borderRadius={"100px"}
						w={"max"}
						h={"2rem"}
						bgColor={"#007D99"}
						onClick={() => {
							setIsCreating(false);
							handleCreateCompany(updatedCompanyFormData);
						}}
					>
						Criar página da empresa
					</Button>
				</Flex>
			)}
		</>
	);
};
