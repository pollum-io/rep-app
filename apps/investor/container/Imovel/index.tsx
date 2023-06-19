import { Flex, Img, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import React, { FunctionComponent, useState } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { ImovelDetail } from "../../components/Imovel/imovel";
import { IOpportunitiesCard } from "../../dtos/Oportunities";

interface IImovelProps {
	imovel: IOpportunitiesCard;
	usersId: any;
}

export const ImovelContainer: FunctionComponent<IImovelProps> = ({
	imovel,
	usersId,
}) => {
	return (
		<DefaultTemplate>
			<ImovelDetail imovelDetails={imovel} usersId={usersId} />
		</DefaultTemplate>
	);
};
