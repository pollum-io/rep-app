import React, { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { useUser } from "../../hooks/useUser";
import { UserLogin } from "ui";
import { IOpportunitiesCard } from "ui/Imovel/dtos/Oportunities";

import { ImovelDetail } from "../../components/Pages/Imovel/imovel";

interface IImovelProps {
	imovel: IOpportunitiesCard;
	opportuntyDetails?: unknown;

	user: UserLogin;
	token: string;
}

export const ImovelContainer: FunctionComponent<IImovelProps> = ({
	imovel,
	opportuntyDetails,
	user,
	token,
}) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(user?.enterprise, token);
	}, [getUserInfos, token, user?.enterprise]);

	return (
		<DefaultTemplate>
			<ImovelDetail
				imovelDetails={imovel}
				opportuntyDetails={opportuntyDetails}
				usersId={user}
				token={token}
			/>
		</DefaultTemplate>
	);
};
