import React, { createContext, useState, useMemo } from "react";

interface IRegisterSteps {
	firstStep: boolean;
	setFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
	secondStep: boolean;
	setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
	isPhysical: boolean;
	setIsPhysical: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterStepsContext = createContext({} as IRegisterSteps);

export const RegisterStepsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [firstStep, setFirstStep] = useState<boolean>(true);
	const [secondStep, setSecondStep] = useState<boolean>(false);
	const [isPhysical, setIsPhysical] = useState<boolean>(true);
	const providerValue = useMemo(
		() => ({
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isPhysical,
			setIsPhysical,
		}),
		[
			firstStep,
			setFirstStep,
			secondStep,
			setSecondStep,
			isPhysical,
			setIsPhysical,
		]
	);

	return (
		<RegisterStepsContext.Provider value={providerValue}>
			{children}
		</RegisterStepsContext.Provider>
	);
};
