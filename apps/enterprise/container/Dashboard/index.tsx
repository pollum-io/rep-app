import { Login } from "../../components/Pages";
import { UserDataPF, UserDataPJ } from "ui";
import { FunctionComponent } from "react";
import {
	Flex,
	Img,
	Text,
	useDisclosure,
	useMediaQuery,
} from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";

interface IDashboardContainer {
	token: string;
	userDataPJ: UserDataPF;
	investorPjId: string;
}

export const DashboardContainer: FunctionComponent<IDashboardContainer> = ({
	investorPjId,
	token,
	userDataPJ,
}) => {
	return (
		<DefaultTemplate>
			<Flex>Ola</Flex>
		</DefaultTemplate>
	);
};
