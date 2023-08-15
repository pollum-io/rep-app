import { Flex, Img, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CollectionsModal } from "./CollectionsModal";

interface ICollections {
	images: string[];
}

export const Collections: React.FC<ICollections> = (props) => {
	const { images } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedImage, setSelectedImage] = useState<any>();
	console.log(selectedImage);
	return (
		<Flex
			w="100%"
			h="100%"
			gap="0.5rem"
			pb="1.5rem"
			mt="2rem"
			onClick={onOpen}
			justifyContent="center"
		>
			<CollectionsModal
				images={images}
				isOpen={isOpen}
				onClose={onClose}
				selectedImage={selectedImage}
			/>
			<Flex
				onClick={() => {
					onOpen;
					setSelectedImage(images[0]);
				}}
			>
				<Img
					width="34.75rem"
					height="25rem"
					src={`/api/file/${images[0]}`}
					borderLeftRadius="0.75rem"
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
			</Flex>
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 2 }} gap="0.5rem">
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[1]}`}
					onClick={() => {
						onOpen;
						setSelectedImage(images[1]);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[2]}`}
					borderTopRightRadius="0.75rem"
					onClick={() => {
						onOpen;
						setSelectedImage(images[2]);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[3]}`}
					onClick={() => {
						onOpen;
						setSelectedImage(images[3]);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
				<Img
					w="17.125rem"
					h="12.25rem"
					src={`/api/file/${images[4]}`}
					borderBottomRightRadius="0.75rem"
					onClick={() => {
						onOpen;
						setSelectedImage(images[4]);
					}}
					_hover={{ cursor: "pointer", filter: "brightness(90%)" }}
					transition="200ms"
				/>
			</SimpleGrid>
		</Flex>
	);
};
