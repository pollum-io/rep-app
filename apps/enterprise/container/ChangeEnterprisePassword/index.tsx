import React, { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserLogin } from "ui";
import { ChangeEnterprisePasswordPage } from "../../components/Pages/ChangeEnterprisePassword";

interface IChangeEnterprisePassword {
	token: string;
	user: UserLogin;
}

export const ChangeEnterprisePasswordContainer: FunctionComponent<
	IChangeEnterprisePassword
> = ({ token, user }) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(user?.enterprise, token);
	}, [getUserInfos, token, user?.enterprise]);

	return (
		<DefaultTemplate>
			<ChangeEnterprisePasswordPage />
		</DefaultTemplate>
	);
};
