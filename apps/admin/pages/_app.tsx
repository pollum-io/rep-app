import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { ToastyProvider } from "../contexts/toasty";
import { QueryClient, QueryClientProvider } from "react-query";

const toasty = {
	bg: "#FFFFFF",
	text: "#2D3748",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const queryClient = new QueryClient({});

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider resetCSS theme={theme}>
				<ToastyProvider {...toasty}>
					<Component {...pageProps} />
				</ToastyProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
};

export default MyApp;
