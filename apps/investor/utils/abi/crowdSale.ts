export const crowdSale = {
	address: "0x7d11109Bc72946c2de0CdBda8ADcAEb1E06DdFCC",
	abi: [
		{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_amount",
					type: "uint256",
				},
			],
			name: "buyToken",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
} as const;
