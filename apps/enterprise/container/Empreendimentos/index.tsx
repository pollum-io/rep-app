import { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { Flex } from "@chakra-ui/react";
import { OpportunitiesCard } from "ui";
import { useRegisterSteps } from "../../hooks";
import { useOpportunities } from "../../hooks/useOpportunities";
import { useUser } from "../../hooks/useUser";

interface IEmpreendimento {
	enterpriseId: string;
	token: string;
}

export const EmpreendimentosContainer: FunctionComponent<IEmpreendimento> = ({
	enterpriseId,
	token,
}) => {
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { setCotas } = useOpportunities();
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(enterpriseId, token);
	}, [enterpriseId, getUserInfos, token]);

	return (
		<DefaultTemplate>
			<Flex my={"4rem"} mx={"1.5rem"} pb={"20rem"}>
				<OpportunitiesCard
					token={token}
					isAdmin={false}
					isEnterprise={true}
					setFirstStep={setFirstStep}
					setCotas={setCotas}
					setSecondStep={setSecondStep}
					enterpriseId={enterpriseId}
				/>
			</Flex>
		</DefaultTemplate>
	);
};
