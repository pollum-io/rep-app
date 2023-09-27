import type { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../contexts/user";
import { OpportunitiesProvider } from "../contexts/opportunities";
import { ToastyProvider } from "../contexts/toasty";
import AppWrapper from "../container/AppWrapper";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles";
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
							<AppWrapper>
								<Component {...pageProps} />
								<Script
									id="HotJarAnalytics"
									strategy="afterInteractive"
									dangerouslySetInnerHTML={{
										__html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3635810,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
									}}
								/>
							</AppWrapper>
						</ToastyProvider>
					</OpportunitiesProvider>
				</UserProvider>
			</ChakraProvider>{" "}
		</QueryClientProvider>
	);
};
export default MyApp;
