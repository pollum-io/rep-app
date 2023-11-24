import React, { createContext, useState, useMemo, useEffect } from "react";
import { PersistentFramework } from "ui";

export const CreateOpportuntyContext = createContext({} as any);

export const CreateOpportuntyProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const providerValue = useMemo(
		() => ({}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<CreateOpportuntyContext.Provider value={providerValue}>
			{children}
		</CreateOpportuntyContext.Provider>
	);
};
