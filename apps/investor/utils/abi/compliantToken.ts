export const compliantToken = {
	address: "0xEa86E79d1e6e0BC741Fd2523163DcAD6A11e9fAa",
	abi: [
		{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
		{
			inputs: [
				{
					internalType: "address",
					name: "_addresses",
					type: "address",
				},
			],
			name: "addToWhitelist",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
} as const;
