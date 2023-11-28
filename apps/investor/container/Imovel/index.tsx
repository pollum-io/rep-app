import React, { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { ImovelDetail } from "../../components/Imovel/imovel";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { useUser } from "../../hooks/useUser";
import { UserLogin } from "ui";

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
			<ImovelDetail imovelDetails={imovel} usersId={usersId} token={token} />
		</DefaultTemplate>
	);
};
