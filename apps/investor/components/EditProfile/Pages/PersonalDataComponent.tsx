import { Flex } from "@chakra-ui/react";
import { useUser } from "../../../hooks/useUser";
import { PersonalDataPF } from "../PersonalDataPF";
import { PersonalDataPJ } from "../PersonalDataPJ";

interface IChangePassword {
	data?: any;
	token?: any;
}

export const PersonalDataComponent: React.FC<IChangePassword> = props => {
	const { data, token } = props;
	const { isInvestor } = useUser();
	console.log(isInvestor, "isInvestor");
	return (
		<Flex w="100%" justifyContent="end">
			{isInvestor ? (
				<PersonalDataPF data={data} token={token} />
			) : (
				<PersonalDataPJ data={data} token={token} />
			)}
		</Flex>
	);
};
