import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

const variantCircular = definePartsStyle({
	control: defineStyle({
		rounded: "full",
		background: "#FFFFFF",
		borderColor: "#E2E8F0",
		_checked: {
			background: "#1789A3",
			borderColor: "#1789A3",
			_hover: {
				background: "#1789A3",
				borderColor: "#1789A3",
			},
		},
	}),
});
const variantGreen = definePartsStyle({
	control: defineStyle({
		background: "#FFFFFF",
		borderColor: "#E2E8F0",
		_checked: {
			background: "#1789A3",
			borderColor: "#1789A3",
			_hover: {
				background: "#1789A3",
				borderColor: "#1789A3",
			},
		},
	}),
});
const variantWhite = definePartsStyle({
	control: defineStyle({
		background: "#1789A3",
		borderColor: "#B1D8DF",
		color: "#1789A3",
		_checked: {
			background: "#FFFFFF",
			borderColor: "#FFFFFF",
			color: "#007D99",
			_hover: {
				background: "#FFFFFF",
				borderColor: "#FFFFFF",
			},
		},
	}),
});

const variants = {
	circular: variantCircular,
	white: variantWhite,
	green: variantGreen,
};

const sizes = {
	xl: definePartsStyle({
		control: defineStyle({
			boxSize: 14,
		}),
		label: defineStyle({
			fontSize: "2xl",
			marginLeft: 6,
		}),
	}),
};

export const checkboxTheme = defineMultiStyleConfig({
	variants,
	sizes,
});
