import { configureChains, createConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";

const ripple = {
	id: 1440002,
	name: "XRPL EVM Sidechain",
	network: "xrpl",
	nativeCurrency: {
		decimals: 6,
		name: "XRP",
		symbol: "XRP",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc-evm-sidechain.xrpl.org"],
		},
		public: {
			http: ["https://rpc-evm-sidechain.xrpl.org"],
		},
	},
	blockExplorers: {
		default: { name: "Explorer", url: "https://evm-sidechain.xrpl.org" },
	},
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[ripple],
	[publicProvider()]
);

export const connectionConfig = createConfig({
	connectors: [
		new MetaMaskConnector({
			chains,
			options: { UNSTABLE_shimOnConnectSelectAccount: true },
		}),
		new InjectedConnector({
			chains,
			options: {
				name: "Injected",
				shimDisconnect: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});
