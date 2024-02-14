import React, { useState } from "react";
import {
	Box,
	Flex,
	Img,
	Text,
	Button,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Image,
} from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { PiFilePdfLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

interface IPlants {
	id: number;
	imageUrl: string;
	name: string;
}

const plants = [
	{
		id: 1,
		name: "Planta baixa",
		imageUrl: <PiFilePdfLight size={90} color="#003243c8" />,
	},
	{
		id: 2,
		name: "Planta estrutural",
		imageUrl: <PiFilePdfLight size={90} color="#003243c8" />,
	},
	{
		id: 3,
		name: "Planta hidráulica",
		imageUrl: <PiFilePdfLight size={90} color="#003243c8" />,
	},
];

const PlantaCarrousel = () => {
	const { t } = useTranslation();

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<IPlants>();
	const [sliderRef, instanceRef] = useKeenSlider({
		mode: "free-snap",
		slides: {
			perView: 3,
			spacing: 15,
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	const handleViewPlant = (index: number) => {
		const plantIndex = (-1 + index) % plants.length;
		setSelectedImage(plants[plantIndex]);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleDownload = () => {
		const pdfLink =
			"../../../../apps/investor/public/images/backgrounds/Vestar_pdf.pdf";
		const link = document.createElement("a");
		link.href = pdfLink;
		link.download = "example.pdf";
		link.click();
	};

	return (
		<Flex gap={"1.5rem"} w={"70rem"}>
			<div ref={sliderRef} className="keen-slider">
				{plants.map((plant) => (
					<div className="keen-slider__slide" key={plant.id}>
						<Box
							border="1px solid #bdbdbd"
							borderRadius="0.75rem"
							_hover={{
								boxShadow:
									"0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);",
							}}
						>
							<Flex
								justifyContent={"center"}
								alignItems={"center"}
								objectFit="cover"
								h={"12rem"}
								borderRadius="0.75rem"
								transition={"0.6s"}
								_hover={{ opacity: 0.8 }}
							>
								{plant.imageUrl}
							</Flex>
							<Flex flexDir="column" px="1rem" pb="1rem" pt="0.6875rem">
								<Text fontWeight="500" color="#171923">
									{plant.name}
								</Text>
								<Flex gap="1rem">
									<Button
										size="sm"
										mt={2}
										w="13rem"
										fontSize="0.75rem"
										fontWeight="500"
										border="1px solid #003243c8"
										bg="transparent"
										color="#003243c8"
										h="max"
										py="1"
										onClick={() => handleViewPlant(plant.id)}
									>
										{t("opportunitieDetails.visualizar")}
									</Button>
									<Img
										src="/icons/downloand.svg"
										alt="Download"
										mt={2}
										style={{ cursor: "pointer" }}
										onClick={handleDownload}
									/>{" "}
								</Flex>
							</Flex>
						</Box>
					</div>
				))}
				{/* <Flex
					position="absolute"
					top="50%"
					left="0"
					transform="translateY(-50%)"
				>
					<IconButton
						icon={<ArrowBackIcon />}
						aria-label="Previous"
						size="lg"
						isRound
						ml={2}
						bg={"white"}
						color={"#003243c8"}
						boxShadow={
							"0px 2px 4px -1px rgba(0,0,0,0.05), 0px 6px 10px -2px rgba(0,0,0,0.1)"
						}
						onClick={(e) => {
							e.stopPropagation();
							instanceRef.current?.prev();
						}}
						disabled={currentSlide === 0}
					/>
				</Flex>
				{loaded && instanceRef.current && (
					<Flex
						position="absolute"
						top="50%"
						right="0"
						transform="translateY(-50%)"
					>
						<IconButton
							icon={<ArrowForwardIcon />}
							aria-label="Next"
							size="lg"
							isRound
							mr={2}
							bg={"white"}
							color={"#003243c8"}
							boxShadow={
								"0px 2px 4px -1px rgba(0,0,0,0.05), 0px 6px 10px -2px rgba(0,0,0,0.1)"
							}
							onClick={(e) => {
								e.stopPropagation();
								instanceRef.current?.next();
							}}
							disabled={
								currentSlide ===
								instanceRef.current.track.details.slides.length - 1
							}
						/>
					</Flex> */}
			</div>
			<Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedImage && selectedImage?.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						flexDir={"row"}
						justifyContent={"center"}
						alignItems={"center"}
						w={"100%"}
						h={"100%"}
					>
						<Flex>An example here</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default PlantaCarrousel;
