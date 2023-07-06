import { Flex } from "@chakra-ui/react";
import { useUser } from "../../../hooks/useUser";
import { PersonalDataPF } from "../PersonalDataPF";
import { PersonalDataPJ } from "../PersonalDataPJ";
import { UserDataPF } from "../../../dtos/UserPF";
import { UserDataPJ } from "../../../dtos/UserPJ";

interface IChangePassword {
	userDataPF?: UserDataPF;
	userDataPJ?: UserDataPJ;
	token?: string;
}

export const PersonalDataComponent: React.FC<IChangePassword> = (props) => {
	const { userDataPF, userDataPJ, token } = props;
	const { isInvestor } = useUser();

	return (
		<Flex w="100%" justifyContent="end">
			{isInvestor || userDataPF?.is_legal_entity ? (
				<PersonalDataPF data={userDataPF} token={token} />
			) : (
				<PersonalDataPJ data={userDataPJ} token={token} />
			)}
		</Flex>
	);
};
