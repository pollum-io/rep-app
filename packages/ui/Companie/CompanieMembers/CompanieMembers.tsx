import { Flex, Img, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { ICompanieMembers } from "./dto";

export const CompanieMember: FunctionComponent<ICompanieMembers> = ({
	image,
	name,
	occupation,
	isDrawer,
}) => {
	const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

	const [fotoFromBack, setfotoFromBack] = useState(false);
	const [newFoto, setnewFoto] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		if (image) {
			if (typeof image === "string") {
				console.log("OI");
				setfotoFromBack(true);
				setnewFoto(false);
			} else if (typeof image !== "string") {
				console.log("TCHAU");
				setfotoFromBack(false);
				setnewFoto(true);
			}
		}
	}, [image]);

	useEffect(() => {
		if (image) {
			if (
				fotoFromBack === true &&
				newFoto === false &&
				typeof image === "string"
			) {
				setImageUrl(`${url}/file/${image}`);
			} else if (
				newFoto === true &&
				fotoFromBack === false &&
				image instanceof Blob
			) {
				setImageUrl(URL.createObjectURL(image));
			} else {
				setImageUrl("");
			}
		}
	}, [image, fotoFromBack, newFoto, url]);

	return (
		<Flex
			flexDirection="column"
			gap="0.5rem"
			alignItems="center"
			m={"0 auto"}
			py="1rem"
			w={"max"}
		>
			<Flex w="4rem" h="4rem">
				{isDrawer ? (
					<Img src={`${url}/file/${image}`} />
				) : (
					<Img src={imageUrl} borderRadius={"62.4375rem"} />
				)}
			</Flex>
			<Flex
				fontFamily="Poppins"
				fontSize="0.875rem"
				lineHeight="1.25rem"
				alignItems="center"
				color="#171923"
				gap="0.25rem"
				flexDirection="column"
				w={"10rem"}
				textAlign={"center"}
			>
				<Text>{name}</Text>
				<Text fontWeight="400">{occupation}</Text>
			</Flex>
		</Flex>
	);
};

export const CompanieMembers: FunctionComponent<ICompanieMembers> = ({
	image,
	name,
	occupation,
}) => {
	return (
		<Flex my={"2rem"} pr={"3rem"} flexWrap={"wrap"}>
			<CompanieMember image={image} name={name} occupation={occupation} />
		</Flex>
	);
};
