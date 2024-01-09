import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreateAdminCreateStepsProvider } from "../contexts/register";
import "../styles/appScrollbar.css";
import { CreateCompanyProvider } from "../contexts/createCompany";
import { UserProvider } from "../contexts/user";
import { ToastyProvider } from "../contexts/toasty";
import "../helpers/i18";
import { CreateOpportuntyProvider } from "../contexts/createOpportunity";

const toasty = {
	bg: "#FFFFFF",
	text: "#2D3748",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const queryClient = new QueryClient({});

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider resetCSS theme={theme}>
				<CreateOpportuntyProvider>
					<UserProvider>
						<ToastyProvider {...toasty}>
							<CreateCompanyProvider>
								<CreateAdminCreateStepsProvider>
									<Component {...pageProps} />
								</CreateAdminCreateStepsProvider>
							</CreateCompanyProvider>
						</ToastyProvider>
					</UserProvider>{" "}
				</CreateOpportuntyProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
};
export default MyApp;
