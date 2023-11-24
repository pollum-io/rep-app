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
	PersistentFramework,
} from "ui";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";
import {
	fetchCreateEnterprise,
	fetchUpdateEnterprise,
	fetchUploadImages,
} from "services";
import { useCreateAdminCreateSteps } from "../../../../hooks/useCreateAdminCreateSteps";
import { useToasty } from "../../../../hooks/useToasty";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface IDrawerComponent {
	onClose: any;
	isOpen: any;
	token: string;
}

export const DrawerComponent: React.FC<IDrawerComponent> = ({
	isOpen,
	onClose,
	token,
}) => {
	const btnRef = useRef();
	const {
		companyFormData,
		setIsCreating,
		companyImages,
		isEditing,
		deleteAllDataFromStateCompanyForm,
		haveCompanyCreateInProcess,
		handleHasCompanyBeingCreated,
		setMembers,
		entepriseId,
	} = useCreateCompany();
	const { setFirstStep, setSecondStep, setIsCreatePage } =
		useCreateAdminCreateSteps();
	const { toast } = useToasty();

	const updatedCompanyFormData = { ...companyFormData };

	if (companyImages.logo) {
		updatedCompanyFormData.enterprise_logo = companyImages.logo;
	}

	if (companyImages.banner) {
		updatedCompanyFormData.enterprise_banner = companyImages.banner;
	}
	updatedCompanyFormData.contact_number =
		updatedCompanyFormData.social_media?.telephone;

	updatedCompanyFormData?.team?.forEach((member, index) => {
		if (companyImages[index]) {
			member.image = URL.createObjectURL(companyImages[index]);
		}
	});

	const handleCreateCompany = async (data: any) => {
		let request: any;

		const formData = new FormData();
		formData.append("logo", data?.enterprise_logo);
		formData.append("banner", data?.enterprise_banner);
		data?.team.forEach((teamMember, index) => {
			if (typeof teamMember.image !== "string") {
				formData.append("team", teamMember.image, `file${index}`);
			}
		});

		const retornoDasImagens = await fetchUploadImages(formData, token);

		let startIndex = 0;

		if (data?.enterprise_logo !== null || data?.enterprise_banner !== null) {
			startIndex = 1;
			if (data?.enterprise_logo !== null && data?.enterprise_banner !== null) {
				startIndex = 2;
			}
		}

		if (data?.team) {
			data.team.forEach((teamMember, index) => {
				const imageIndex = startIndex + index;

				if (imageIndex < retornoDasImagens.files.length) {
					teamMember.image = retornoDasImagens.files[imageIndex];
				}
			});
		}

		data.enterprise_info = {
			...data.enterprise_info,
			enterprises_livn: 0,
			delivered_enterprises: Number(data.enterprise_info.delivered_enterprises),
			in_progress: Number(data.enterprise_info.in_progress),
			total_vgv: Number(data.enterprise_info.total_vgv),
		};

		// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
		request = {
			...(data?.enterprise_name && { enterprise_name: data?.enterprise_name }),
			...(data?.email && { email: data?.email }),
			...(data?.enterprise_logo && {
				enterprise_logo: retornoDasImagens?.files[0],
			}),
			...(data?.enterprise_banner && {
				enterprise_banner:
					data?.enterprise_logo !== null
						? retornoDasImagens?.files[1]
						: retornoDasImagens?.files[0],
			}),
			...(data?.cnpj.replace(/[-./]/g, "") && {
				cnpj: data?.cnpj.replace(/[-./]/g, ""),
			}),
			...(data?.contact_number && { contact_number: data?.contact_number }),
			...(Object.keys(data.social_media).length && {
				social_media: data.social_media,
			}),
			...(data?.description && { description: data?.description }),
			...(data?.team && { team: data?.team }),
			...(Object.keys(data.enterprise_info).length && {
				enterprise_info: data.enterprise_info,
			}),
		};

		try {
			if (isEditing) {
				await fetchUpdateEnterprise(request, entepriseId);
				setFirstStep(false);
				setSecondStep(false);
				setIsCreatePage(false);
				onClose();
				toast({
					id: "toast-edit-suc",
					position: "top-right",
					status: "success",
					title: "Empresa editada!",
				});
			} else {
				await fetchCreateEnterprise(request);
				setFirstStep(false);
				setSecondStep(false);
				setIsCreatePage(false);
				onClose();
				handleHasCompanyBeingCreated(false);
				setMembers([{ image: null, name: "", position: "" }]);
				PersistentFramework.remove("formData");
				deleteAllDataFromStateCompanyForm();
				setIsCreating(false);
				toast({
					id: "toast-create-suc",
					position: "top-right",
					status: "success",
					title: "Empresa criada!",
				});
			}
		} catch {
			toast({
				id: "toast-create-suc",
				position: "top-right",
				status: "error",
				title: "Erro!",
			});
		}
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
														companyImages?.enterprise_logo
															? URL.createObjectURL(
																	companyImages?.enterprise_logo
															  )
															: `${url}/file/${updatedCompanyFormData?.enterprise_logo}`
													}
													banner={
														companyImages?.enterprise_banner
															? URL.createObjectURL(
																	companyImages?.enterprise_banner
															  )
															: `${url}/file/${updatedCompanyFormData?.enterprise_banner}`
													}
													name={companyFormData?.enterprise_name}
													id={`CNPJ: ${companyFormData?.cnpj}`}
													location={companyFormData?.localizacao}
													description={companyFormData?.description}
												/>
											</Flex>
											<CompanieInfoInProgress
												delivered={
													companyFormData?.enterprise_info
														?.delivered_enterprises
												}
												inProgress={
													companyFormData?.enterprise_info?.in_progress
												}
												livnProp={3}
												vgv={companyFormData?.enterprise_info?.total_vgv}
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
														{updatedCompanyFormData?.team?.map(
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
													telephone={companyFormData?.social_media?.telephone}
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
						{isEditing ? "Confirmar edições" : "Criar página da empresa"}
					</Button>
				</Flex>
			)}
		</>
	);
};
