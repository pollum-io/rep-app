import React, { createContext, useState, useMemo } from "react";

interface IOpportunities {
	ended: boolean;
	setEnded: React.Dispatch<React.SetStateAction<boolean>>;
	hasToken: boolean;
	setHasToken: React.Dispatch<React.SetStateAction<boolean>>;
	cotas: number;
	setCotas: React.Dispatch<React.SetStateAction<number>>;
}

export const OpportunitiesContext = createContext({} as IOpportunities);

export const OpportunitiesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [ended, setEnded] = useState(false);
	const [hasToken, setHasToken] = useState(false);
	const [cotas, setCotas] = useState<number>(0);
	const providerValue = useMemo(
		() => ({
			ended,
			setEnded,
			hasToken,
			setHasToken,
			cotas,
			setCotas,
		}),
		[ended, setEnded, hasToken, setHasToken, cotas, setCotas]
	);

	return (
		<OpportunitiesContext.Provider value={providerValue}>
			{children}
		</OpportunitiesContext.Provider>
	);
};
