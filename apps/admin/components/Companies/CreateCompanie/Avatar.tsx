import React, { useState, useEffect } from "react";
import { Button, Flex, Img } from "@chakra-ui/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

type IAvatar = {
	setShowImage?: unknown;
	avatarVisible?: unknown;
	showImage?: unknown;
	handleToggleImage?: unknown;
	foto?: unknown;
	nome?: string;
	cargo?: string;
	onInputChange?: unknown;
	onImageChange?: unknown;
	handleMouseEnter?: unknown;
	handleMouseLeave?: unknown;
	deleteUser?: unknown;
	index?: unknown;
};
export const Avatar: React.FC<IAvatar> = ({
	showImage,
	foto,
	onInputChange,
	handleMouseEnter,
	handleMouseLeave,
	onImageChange,
	handleToggleImage,
}) => {
	const [avatarVisible, setAvatarVisible] = useState<boolean>();
	const [fotoFromBack, setfotoFromBack] = useState<boolean>();
	const [newFoto, setnewFoto] = useState<boolean>();
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (foto) {
			if (typeof foto === "string") {
				setfotoFromBack(true);
				setnewFoto(false);
			} else if (typeof foto !== "string") {
				setfotoFromBack(false);
				setnewFoto(true);
			}
		}
	}, [foto]);

	useEffect(() => {
		if (foto) {
			setAvatarVisible(false);
			if (
				fotoFromBack === true &&
				newFoto === false &&
				typeof foto === "string"
			) {
				setImageUrl(`${url}/file/${foto}`);
			} else if (
				newFoto === true &&
				fotoFromBack === false &&
				foto instanceof Blob
			) {
				setImageUrl(URL.createObjectURL(foto));
			} else {
				setImageUrl(null);
			}
		} else {
			setAvatarVisible(true);
		}
	}, [foto, fotoFromBack, newFoto]);

	return (
		<Flex
			bgColor={"#E2E8F0"}
			borderRadius={"624.9375rem"}
			mr={"1.1875rem"}
			alignItems={"end"}
			transition={"0.5s"}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			position="relative"
			bgImage={"url('/logos/avatarMember.svg')"}
			w={"4rem"}
			h={"4rem"}
		>
			{avatarVisible ? (
				<Flex bgImage={"url('/logos/avatarMember.svg')"} />
			) : (
				<Img
					w={"4rem"}
					h={"4rem"}
					borderRadius={"624.9375rem"}
					src={imageUrl}
				/>
			)}

			{!foto && showImage && (
				<Button
					as="span"
					top="25%"
					left="20%"
					w="1rem"
					h="2rem"
					p={"0"}
					m={"0"}
					bgColor={"#B1D8DF"}
					borderRadius={"50%"}
					alignItems="center"
					justifyContent="center"
					position="absolute"
					transition={"0.5s"}
					onClick={() => {
						setAvatarVisible(true);
						handleToggleImage();
					}}
				>
					<Img
						src={"/logos/bluePlus.svg"}
						cursor="pointer"
						position="absolute"
					/>
					<input
						id="#fileInputAvatar"
						type="file"
						accept="image/*"
						onChange={(e) => onInputChange("image", e.target.files[0])}
					/>
				</Button>
			)}
			{foto && showImage && (
				<Flex
					top="25%"
					left="25%"
					w="50%"
					h="50%"
					bgColor={"#B1D8DF"}
					borderRadius={"50%"}
					alignItems="center"
					justifyContent="center"
					transition={"0.5s"}
					position="absolute"
					onClick={() => {
						onImageChange("image");
						setAvatarVisible(true);
					}}
				>
					<Img
						src={"/logos/blueTrash.svg"}
						cursor="pointer"
						position="absolute"
					/>
				</Flex>
			)}
		</Flex>
	);
};
