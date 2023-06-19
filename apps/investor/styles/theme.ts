import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { checkboxTheme } from "./checkboxes";

const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: "light",
};

export const theme = extendTheme({
	config,
	overrides: {
		styles: {
			"*": {
				boxShadow: "none",
			},
		},
	},
	components: {
		Switch: {
			baseStyle: {
				track: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
		},
		ModalCloseButton: {
			baseStyle: {
				_focus: {
					boxShadow: "none",
				},
			},
		},
		Button: {
			baseStyle: {
				_focus: {
					boxShadow: "none",
				},
			},
		},
		Checkbox: checkboxTheme,
		Progress: {
			baseStyle: {
				filledTrack: {
					bg: "#007088",
				},
			},
		},
	},

	zIndices: {
		default: 1,
		behind: "-1000",
	},

	fonts: {
		heading: "Inter",
		body: "Poppins",
		mono: "Roboto Mono",
	},
});
