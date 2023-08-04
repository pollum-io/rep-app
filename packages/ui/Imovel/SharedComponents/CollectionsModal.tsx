import {
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";
import { Carousel } from "../ImovelHomePageComponents";

interface ICollectionsModal {
	isOpen: boolean;
	onClose: () => void;
	images: string[];
}

export const CollectionsModal: React.FC<ICollectionsModal> = (props) => {
	const { isOpen, onClose, images } = props;

	return (
		<>
			<Modal blockScrollOnMount size="full" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bgColor={"#ffffff"} h="100%">
					<ModalBody>
						<Flex
							justifyContent="center"
							alignItems="center"
							h="100%"
							flexDirection="column"
							gap="1.125rem"
						>
							<Flex
								gap="1rem"
								color="#171923"
								w="95%"
								maxWidth="70rem"
								justifyContent="end"
								alignItems="center"
							>
								<Text fontFamily="Poppins" fontSize="1rem" lineHeight="1.5rem">
									Fechar
								</Text>
								<Flex _hover={{ cursor: "pointer" }}>
									<GrFormClose size={22} onClick={onClose} />
								</Flex>
							</Flex>
							<Carousel
								modal_images={images}
								widthValue="55.8125rem"
								heightValue="37.5rem"
							/>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
