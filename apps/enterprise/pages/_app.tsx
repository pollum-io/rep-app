import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastyProvider } from "../contexts/toasty";
import { OpportunitiesProvider } from "../contexts/opportunities";
// import { WalletProvider } from "../contexts/wallet";
import { UserProvider } from "../contexts/user";
// import { TransactionsProvider } from "../contexts/transactions";
import "../styles/maps.css";
import "../styles/termsScrollbar.css";
import "../styles/mapsLabel.css";
import "../styles/tooltipChart.css";
import "../styles/pieChart.css";
import "../helpers/i18";
import "../styles/pageTransition.css";
import "../styles/investModalScrollbar.css";
import "../styles/appScrollbar.css";
import "../styles/confirmedAnimation.css";
import { RegisterStepsProvider } from "../contexts";
import "../helpers/i18";

const toasty = {
	bg: "#FFFFFF",
	text: "#2D3748",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const queryClient = new QueryClient({});

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider resetCSS theme={theme}>
				<UserProvider>
					<OpportunitiesProvider>
						<ToastyProvider {...toasty}>
							<RegisterStepsProvider>
								<Component {...pageProps} />
							</RegisterStepsProvider>
						</ToastyProvider>
					</OpportunitiesProvider>
				</UserProvider>
			</ChakraProvider>{" "}
		</QueryClientProvider>
	);
};
export default MyApp;
