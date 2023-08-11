import React, { FunctionComponent, useEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { ImovelDetail } from "../../components/Imovel/imovel";
import { IOpportunitiesCard } from "../../dtos/Oportunities";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { useUser } from "../../hooks/useUser";

interface IImovelProps {
	imovel: IOpportunitiesCard;
	usersId: UserInfo;
}

export const ImovelContainer: FunctionComponent<IImovelProps> = ({
	imovel,
	usersId,
}) => {
	const { getUserInfos } = useUser();

	useEffect(() => {
		getUserInfos(
			usersId?.investor_pf === null
				? usersId?.investor_pj
				: usersId?.investor_pf
		);
	}, [getUserInfos, usersId?.investor_pf, usersId?.investor_pj]);

	return (
		<DefaultTemplate>
			<ImovelDetail imovelDetails={imovel} usersId={usersId} />
		</DefaultTemplate>
	);
};
