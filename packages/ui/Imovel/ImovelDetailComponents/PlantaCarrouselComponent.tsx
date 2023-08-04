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

interface IPlants {
	id: number;
	imageUrl: string;
	name: string;
}

const plants = [
	{ id: 1, name: "Planta 1", imageUrl: "/images/Map.png" },
	{ id: 2, name: "Planta 2", imageUrl: "/images/Map.png" },
	{ id: 3, name: "Planta 3", imageUrl: "/images/Map.png" },
	{ id: 4, name: "Planta 4", imageUrl: "/images/Map.png" },
	{ id: 5, name: "Planta 5", imageUrl: "/images/Map.png" },
	{ id: 6, name: "Planta 6", imageUrl: "/images/Map.png" },
];

const PlantaCarrousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<IPlants>();
	const [sliderRef, instanceRef] = useKeenSlider({
		mode: "free-snap",
		slides: {
			perView: 3.5,
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
							<Img
								src={plant.imageUrl}
								alt={plant.name}
								objectFit="cover"
								h={"12rem"}
								borderRadius="0.75rem"
							/>
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
										border="1px solid #007D99"
										bg="transparent"
										color="#007D99"
										h="max"
										py="1"
										onClick={() => handleViewPlant(plant.id)}
									>
										Visualizar
									</Button>
									<Img src="/icons/downloand.svg" alt="Download" mt={2} />
								</Flex>
							</Flex>
						</Box>
					</div>
				))}
				<Flex
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
						color={"#007D99"}
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
							color={"#007D99"}
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
					</Flex>
				)}
			</div>
			<Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedImage && selectedImage?.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{selectedImage && (
							<Image
								src={selectedImage?.imageUrl}
								alt={selectedImage?.name}
								maxH="80vh"
								mx="auto"
								objectFit="contain"
							/>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default PlantaCarrousel;
