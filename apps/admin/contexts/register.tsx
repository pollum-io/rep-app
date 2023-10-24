import React, { createContext, useState, useMemo } from "react";

interface ICreateCompanieSteps {
	firstStep: boolean;
	setFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
	secondStep: boolean;
	setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
	isCreatePage: boolean;
	setIsCreatePage: React.Dispatch<React.SetStateAction<boolean>>;
	thirdStep: boolean;
	setThirdStep: React.Dispatch<React.SetStateAction<boolean>>;
	fourthStep: boolean;
	setFourthStep: React.Dispatch<React.SetStateAction<boolean>>;
	isCreateOpportunityPage: boolean;
	setIsCreatOpportunityePage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAdminCreateStepsContext = createContext(
	{} as ICreateCompanieSteps
);

export const CreateAdminCreateStepsProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [firstStep, setFirstStep] = useState<boolean>(true);
	const [secondStep, setSecondStep] = useState<boolean>(false);
	const [thirdStep, setThirdStep] = useState<boolean>(false);
	const [fourthStep, setFourthStep] = useState<boolean>(false);
	const [isCreatePage, setIsCreatePage] = useState<boolean>(false);
	const [isCreateOpportunityPage, setIsCreatOpportunityePage] =
		useState<boolean>(false);

	const providerValue = useMemo(
		() => ({
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isCreatePage,
			setIsCreatePage,
			thirdStep,
			fourthStep,
			setThirdStep,
			setFourthStep,
			isCreateOpportunityPage,
			setIsCreatOpportunityePage,
		}),
		[
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isCreatePage,
			setIsCreatePage,
			thirdStep,
			fourthStep,
			isCreateOpportunityPage,
		]
	);

	return (
		<CreateAdminCreateStepsContext.Provider value={providerValue}>
			{children}
		</CreateAdminCreateStepsContext.Provider>
	);
};
