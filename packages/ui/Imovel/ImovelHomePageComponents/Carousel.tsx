import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import { apiInstance } from "../../../../apps/investor/services/api";

const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
};

interface ICarousel {
	widthValue: string;
	heightValue: string;
	extra_images?: string[];
	modal_images?: string[];
}

export const Carousel: React.FC<ICarousel> = (props) => {
	const { widthValue, heightValue, extra_images, modal_images } = props;
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const top = useBreakpointValue({ base: "90%", md: "50%" });
	const side = useBreakpointValue({ base: "30%", md: "10px" });
	const api = apiInstance();
	const [imagesCarousel, setImagesCarousel] = useState<string[]>([]);

	useEffect(() => {
		if (extra_images) {
			extra_images?.map((picture: string) => {
				api.get(`/file/${picture}`).then((response) => {
					setImagesCarousel((prevState) => [
						...prevState,
						response.request?.responseURL,
					]);
				});
			});
		} else {
			modal_images?.map((picture: string) => {
				api.get(`/file/${picture}`).then((response) => {
					setImagesCarousel((prevState) => [
						...prevState,
						response.request?.responseURL,
					]);
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extra_images, modal_images]);

	return (
		<Box
			position={"relative"}
			height={heightValue}
			width={widthValue}
			overflow={"hidden"}
			borderRadius="0.25rem"
			_active={{ boxShadow: "none" }}
			boxShadow="none"
		>
			<link
				rel="stylesheet"
				type="text/css"
				charSet="UTF-8"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
			/>
			<IconButton
				aria-label="left-arrow"
				borderRadius="full"
				position="absolute"
				left={side}
				top={top}
				transform={"translate(0%, -50%)"}
				zIndex={2}
				onClick={() => slider?.slickPrev()}
				bgColor="transparent"
				_hover={{}}
				_focus={{ bgColor: "transparent", boxShadow: "none" }}
			>
				<MdArrowBackIosNew color="#ffffff" size={50} />
			</IconButton>
			<IconButton
				aria-label="right-arrow"
				borderRadius="full"
				position="absolute"
				right={side}
				top={top}
				transform={"translate(0%, -50%)"}
				zIndex={2}
				onClick={() => slider?.slickNext()}
				bgColor="transparent"
				_hover={{}}
				_focus={{ bgColor: "transparent", boxShadow: "none" }}
			>
				<MdArrowForwardIos color="#ffffff" size={50} />
			</IconButton>
			<Slider {...settings} ref={(slider) => setSlider(slider)}>
				{imagesCarousel?.map((url: string, index: number) => (
					<Box
						key={index}
						height={heightValue}
						position="relative"
						backgroundPosition="center"
						backgroundRepeat="no-repeat"
						backgroundSize="cover"
						backgroundImage={`url(${url})`}
						objectFit={"cover"}
					/>
				))}
			</Slider>
		</Box>
	);
};
