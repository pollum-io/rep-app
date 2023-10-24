import { FunctionComponent } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	Flex,
	Text,
	Button,
} from "@chakra-ui/react";
import { useCreateCompany } from "../../../hooks/useCreateCompany";
import { PersistentFramework } from "ui";
import { useCreateAdminCreateSteps } from "../../../hooks/useCreateAdminCreateSteps";

interface IWarnCancelCreationModal {
	isOpen: boolean;
	onClose: () => void;
}

export const WarnCancelCreationModal: FunctionComponent<
	IWarnCancelCreationModal
> = ({ isOpen, onClose }) => {
	const {
		handleHasCompanyBeingCreated,
		isEditing,
		setMembers,
		setCompanyFormData,
		deleteAllDataFromStateCompanyForm,
		handleSaveFormData,
	} = useCreateCompany();
	const {
		isCreatePage,
		firstStep,
		secondStep,
		setSecondStep,
		setFirstStep,
		setIsCreatePage,
	} = useCreateAdminCreateSteps();
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"md"}>
			<ModalOverlay />
			<ModalContent
				my={"auto"}
				borderRadius={"1rem"}
				h={"max"}
				py={"0.75rem"}
				px={"1.5rem"}
				maxHeight="90vh"
				gap={"1.5rem"}
			>
				<Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
					<Text color={"#2D3748"} fontSize={"1.125rem"} fontWeight={"600"}>
						Atenção
					</Text>
					<Flex
						gap={"0.5rem"}
						onClick={() => onClose()}
						cursor={"pointer"}
						_hover={{ opacity: 0.6 }}
						transition={"0.5s"}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
								fill="#2D3748"
							/>
						</svg>
					</Flex>
				</Flex>
				<Flex flexDir={"column"}>
					<Text color={"#2D3748"}>
						Se você sair agora perderá todas as informações já realizadas para
						essa empresa.
					</Text>
					<Text color={"#2D3748"}>
						Gostaria de salvar essa criação em rascunhos? Você pode retomá-la
						quando quiser.
					</Text>
				</Flex>
				<Flex gap={"0.75rem"}>
					<Button
						h={"2.5rem"}
						color={"#2D3748"}
						fontSize={"1rem"}
						fontWeight={"500"}
						bgColor={"#E2E8F0"}
						borderRadius={"6.25rem"}
						transition={"0.3s"}
						_hover={{ opacity: 0.7, cursor: "pointer" }}
						onClick={() => {
							setIsCreatePage(false);
							setFirstStep(false);
							setSecondStep(false);
							handleHasCompanyBeingCreated(true);
							onClose();
							handleSaveFormData();
						}}
					>
						Salvar em rascunhos
					</Button>
					<Button
						h={"2.5rem"}
						color={"#fff"}
						fontSize={"1rem"}
						fontWeight={"500"}
						bgColor={"#E53E3E"}
						borderRadius={"6.25rem"}
						transition={"0.3s"}
						_hover={{ opacity: 0.7, cursor: "pointer" }}
						onClick={() => {
							PersistentFramework.remove("formData");
							setIsCreatePage(false);
							setFirstStep(false);
							setSecondStep(false);
							handleHasCompanyBeingCreated(false);
							deleteAllDataFromStateCompanyForm();
							onClose();
						}}
					>
						Descartar criação
					</Button>
				</Flex>
			</ModalContent>
		</Modal>
	);
};
