import React, { createContext, useState, useMemo } from "react";

interface IOpportunities {
	ended: boolean;
	setEnded: React.Dispatch<React.SetStateAction<boolean>>;
	hasToken: boolean;
	setHasToken: React.Dispatch<React.SetStateAction<boolean>>;
	cotas: number;
	setCotas: React.Dispatch<React.SetStateAction<number>>;
	isUserWhitelisted: boolean;
	setIsUserWhitelisted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpportunitiesContext = createContext({} as IOpportunities);

export const OpportunitiesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [ended, setEnded] = useState(false);
	const [hasToken, setHasToken] = useState(false);
	const [isUserWhitelisted, setIsUserWhitelisted] = useState(false);

	const [cotas, setCotas] = useState<number>(0);
	const providerValue = useMemo(
		() => ({
			ended,
			setEnded,
			hasToken,
			setHasToken,
			cotas,
			setCotas,
			isUserWhitelisted,
			setIsUserWhitelisted,
		}),
		[
			ended,
			setEnded,
			hasToken,
			setHasToken,
			cotas,
			setCotas,
			isUserWhitelisted,
			setIsUserWhitelisted,
		]
	);

	return (
		<OpportunitiesContext.Provider value={providerValue}>
			{children}
		</OpportunitiesContext.Provider>
	);
};
