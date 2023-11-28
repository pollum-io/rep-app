import { Flex } from "@chakra-ui/react";
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
	return (
		<Flex w="100%" justifyContent="end">
			{userDataPF ? (
				<>
					<PersonalDataPF
						isCheckout={false}
						userDataPF={userDataPF}
						token={token}
					/>
				</>
			) : (
				<PersonalDataPJ isCheckout={false} data={userDataPJ} token={token} />
			)}
		</Flex>
	);
};
