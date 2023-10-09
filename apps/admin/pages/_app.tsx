import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreateCompanieStepsProvider } from "../contexts/register";
import "../styles/appScrollbar.css";
import { CreateCompanyProvider } from "../contexts/createCompany";

const toasty = {
	bg: "#FFFFFF",
	text: "#2D3748",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const queryClient = new QueryClient({});

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider resetCSS theme={theme}>
				<CreateCompanyProvider>
					<CreateCompanieStepsProvider>
						<Component {...pageProps} />
					</CreateCompanieStepsProvider>
				</CreateCompanyProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
};
export default MyApp;
