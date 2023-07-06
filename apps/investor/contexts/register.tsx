import React, { createContext, useState, useMemo } from "react";

interface IRegister {
	firstStep: boolean;
	setFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
	secondStep: boolean;
	setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
	isPhysical: boolean;
	setIsPhysical: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterContext = createContext({} as IRegister);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
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
		<RegisterContext.Provider value={providerValue}>
			{children}
		</RegisterContext.Provider>
	);
};
