import React, { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserLogin } from "ui";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";

import { ImovelDetail } from "../../components/Pages/Imovel/imovel";

interface IImovelProps {
	imovel: IOpportunitiesCard;
	usersId: UserLogin;
	token: string;
}

export const ImovelContainer: FunctionComponent<IImovelProps> = ({
	imovel,
	usersId,
	token,
}) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(
			usersId?.investor_pf === null
				? usersId?.investor_pj
				: usersId?.investor_pf,
			token
		);
	}, [getUserInfos, token, usersId?.investor_pf, usersId?.investor_pj]);

	return (
		<DefaultTemplate>
			<ImovelDetail imovelDetails={imovel} usersId={usersId} />
		</DefaultTemplate>
	);
};
