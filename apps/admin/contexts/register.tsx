import React, { createContext, useState, useMemo } from "react";

interface ICreateCompanieSteps {
	firstStep: boolean;
	setFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
	secondStep: boolean;
	setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
	isCreatePage: boolean;
	setIsCreatePage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCompanieStepsContext = createContext(
	{} as ICreateCompanieSteps
);

export const CreateCompanieStepsProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [firstStep, setFirstStep] = useState<boolean>(true);
	const [secondStep, setSecondStep] = useState<boolean>(false);
	const [isCreatePage, setIsCreatePage] = useState<boolean>(false);

	const providerValue = useMemo(
		() => ({
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isCreatePage,
			setIsCreatePage,
		}),
		[
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isCreatePage,
			setIsCreatePage,
		]
	);

	return (
		<CreateCompanieStepsContext.Provider value={providerValue}>
			{children}
		</CreateCompanieStepsContext.Provider>
	);
};
