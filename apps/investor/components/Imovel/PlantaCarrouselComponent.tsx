import React, { useState } from "react";
import {
	Box,
	Image,
	Text,
	Button,
	IconButton,
	Img,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const plants = [
	{
		id: 1,
		name: "Planta 1",
		imageUrl: "/images/Map.png",
	},
	{ id: 2, name: "Planta 2", imageUrl: "/images/Map.png" },
	{
		id: 3,
		name: "Planta 3",
		imageUrl: "/images/Map.png",
	},
	{ id: 4, name: "Planta 4", imageUrl: "/images/Map.png" },
	{
		id: 5,
		name: "Planta 5",
		imageUrl: "/images/Map.png",
	},
	{ id: 6, name: "Planta 6", imageUrl: "/images/Map.png" },
];

const PlantaCarrousel = () => {
	const [currentImages, setCurrentImages] = useState(plants.slice(0, 4));
	const [startIndex, setStartIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleNextPage = () => {
		const nextIndex = (startIndex + 1) % plants.length;
		setCurrentImages(plants.slice(nextIndex, nextIndex + 4));
		setStartIndex(nextIndex);
	};

	const handlePreviousPage = () => {
		const previousIndex = (startIndex - 1 + plants.length) % plants.length;
		setCurrentImages(plants.slice(previousIndex, previousIndex + 4));
		setStartIndex(previousIndex);
	};

	const handleViewPlant = (index: number) => {
		const plantIndex = (startIndex + index) % plants.length;
		setSelectedImage(plants[plantIndex]);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const showPreviousArrow = startIndex !== 0;
	const showNextArrow = startIndex !== plants.length - 4;

	return (
		<Box position="relative">
			<Flex display="flex" position="relative" overflow="hidden" gap={"1.5rem"}>
				{currentImages.map((plant, index) => (
					<motion.div
						key={plant.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Box
							width="calc(17rem - .6rem)"
							border="1px solid #bdbdbd"
							borderRadius="0.75rem"
							_hover={{
								boxShadow:
									"0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10);",
							}}
							onClick={() => handleViewPlant(index)}
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
										onClick={() => handleViewPlant(index)}
									>
										Visualizar
									</Button>
									<Img
										src="/icons/downloand.svg"
										aria-label="Download"
										mt={2}
									/>
								</Flex>
							</Flex>
						</Box>
					</motion.div>
				))}
			</Flex>
			<Box
				position="absolute"
				top="0"
				right="0"
				h="100%"
				w="5rem"
				borderRadius="0.75rem"
				bgGradient="linear(to-r, rgba(0,0,0,0), rgba(0,0,0,0.15))"
			/>
			{showPreviousArrow && (
				<Flex
					position="absolute"
					top="50%"
					left="0"
					transform="translateY(-50%)"
				>
					<IconButton
						icon={<ArrowBackIcon />}
						aria-label="Previous"
						onClick={handlePreviousPage}
						size="lg"
						isRound
						ml={2}
						bg={"white"}
						color={"#007D99"}
						boxShadow={
							"0px 2px 4px -1px rgba(0,0,0,0.05), 0px 6px 10px -2px rgba(0,0,0,0.1)"
						}
					/>
				</Flex>
			)}
			{showNextArrow && (
				<Flex
					position="absolute"
					top="50%"
					right="0"
					transform="translateY(-50%)"
				>
					<IconButton
						icon={<ArrowForwardIcon />}
						aria-label="Next"
						onClick={handleNextPage}
						size="lg"
						isRound
						mr={2}
						bg={"white"}
						color={"#007D99"}
						boxShadow={
							"0px 2px 4px -1px rgba(0,0,0,0.05), 0px 6px 10px -2px rgba(0,0,0,0.1)"
						}
					/>
				</Flex>
			)}
			<Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedImage && selectedImage.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{selectedImage && (
							<Image
								src={selectedImage.imageUrl}
								alt={selectedImage.name}
								maxH="80vh"
								mx="auto"
								objectFit="contain"
							/>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default PlantaCarrousel;
