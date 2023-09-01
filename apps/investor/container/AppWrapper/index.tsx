import React from "react";
import { RegisterStepsProvider } from "../../contexts/register";

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <RegisterStepsProvider>{children}</RegisterStepsProvider>;
};

export default AppWrapper;
