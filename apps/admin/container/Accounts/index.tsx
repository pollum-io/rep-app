import { FunctionComponent } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { DefaultTemplate } from "../DefaultTemplate";
import { WhitelistCard } from "../../components/Accounts/WhitelistCard";
import { AdminsCard } from "../../components/Accounts/AdminsCard";

// interface IAccountsContainer {
// 	adminData: any;
// }

export const AccountsContainer: FunctionComponent = () => {
	return (
		<DefaultTemplate>
			<Flex flexDir={"column"}>
				<Text
					color={"#007D99"}
					fontSize={"1.5rem"}
					fontWeight={"500"}
					mt={"1rem"}
					mb={"2rem"}
				>
					Contas
				</Text>
				<Flex flexDir={"row"} gap={"1.5rem"}>
					<WhitelistCard />
					<AdminsCard />
				</Flex>
			</Flex>
		</DefaultTemplate>
	);
};
