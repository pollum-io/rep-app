import { FunctionComponent, ReactNode } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { Flex } from "@chakra-ui/react";
import { OpportunitiesCard } from "ui";
import { useRegisterSteps } from "../../hooks";
import { useOpportunities } from "../../hooks/useOpportunities";

interface IEmpreendimento {
	investor_pf: string;
	token: string;
}

export const EmpreendimentosContainer: FunctionComponent<IEmpreendimento> = ({
	investor_pf,
	token,
}) => {
	const { setFirstStep, setSecondStep } = useRegisterSteps();
	const { setCotas } = useOpportunities();

	return (
		<DefaultTemplate>
			<Flex my={"4rem"} mx={"1.5rem"} pb={"20rem"}>
				<OpportunitiesCard
					investorId={investor_pf}
					token={token}
					isEnterprise={true}
					setFirstStep={setFirstStep}
					setCotas={setCotas}
					setSecondStep={setSecondStep}
				/>
			</Flex>
		</DefaultTemplate>
	);
};
