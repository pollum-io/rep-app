import { api } from "./api";

type ContractData = {
	templateKey: string;
	enterpriseId: string;
	opportunityId: string;
	num_cotas: number;
	totalInvested: number;
};

export const fetchSignContract = async (
	contractData: ContractData,
	token: string
) => {
	try {
		const response = await api.post(`/signer/sign_document`, contractData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
