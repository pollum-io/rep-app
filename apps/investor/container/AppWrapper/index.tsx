import React from "react";
import { RegisterProvider } from "../../contexts/register";

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <RegisterProvider>{children}</RegisterProvider>;
};

export default AppWrapper;
