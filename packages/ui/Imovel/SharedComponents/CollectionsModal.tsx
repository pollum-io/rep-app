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
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ICollectionsModal {
	isOpen: boolean;
	onClose: () => void;
	images: string[];
	selectedImage: string;
	setSelectedImage: unknown;
}

export const CollectionsModal: React.FC<ICollectionsModal> = (props) => {
	const { isOpen, onClose, images, selectedImage, setSelectedImage } = props;
	const [currentIndex, setCurrentIndex] = useState(1);

	const handleClose = () => {
		setSelectedImage("");
		onClose();
	};
	const { t } = useTranslation();

	return (
		<>
			<Modal
				blockScrollOnMount
				size="full"
				isOpen={isOpen}
				onClose={handleClose}
			>
				<ModalOverlay />
				<ModalContent bgColor={"#ffffff"}>
					<ModalBody height="inherit">
						<Flex
							justifyContent="center"
							alignItems="center"
							h="100vh"
							flexDirection="column"
							gap="1.125rem"
						>
							<Flex
								gap="1rem"
								color="#171923"
								w="100%"
								justifyContent="space-between"
								alignItems="center"
								px={"5rem"}
							>
								<Flex>
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
									>
										{currentIndex} de {images?.length}
									</Text>
								</Flex>
								<Flex
									transition={"0.5s"}
									_hover={{ cursor: "pointer", opacity: 0.6 }}
									onClick={handleClose}
								>
									<Text
										fontFamily="Poppins"
										fontSize="1rem"
										lineHeight="1.5rem"
									>
										{t("opportunitieDetails.close")}
									</Text>
									<Flex>
										<GrFormClose size={22} />
									</Flex>
								</Flex>
							</Flex>
							<Carousel
								modal_images={images}
								selectedImage={selectedImage}
								widthValue="85.8125rem"
								heightValue="50rem"
								isOpen={isOpen}
								setCurrentIndex={setCurrentIndex}
							/>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
