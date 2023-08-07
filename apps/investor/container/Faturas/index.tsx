import React, { FunctionComponent } from "react";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { Flex, Img, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { FaturasPage } from "../../Faturas";

interface UserData {
	token: string;
	user: {
		investor_pj?: string;
		investor_pf?: string;
	};
	userDataPF: UserDataPF;
	userDataPJ: UserDataPJ;
}

export const FaturasContainer: FunctionComponent<UserData> = (props) => {
	return (
		<DefaultTemplate>
			<FaturasPage />
		</DefaultTemplate>
	);
};
