import React, { useEffect, createContext, useState, useMemo } from "react";
import { useToast, useMediaQuery } from "@chakra-ui/react";

import { ToastyCard } from "../components";
import { UseToastOptions } from "@chakra-ui/react";

type setType<T> = React.Dispatch<React.SetStateAction<T>>;

type children = React.ReactNode;

export interface IToastyProviderProps {
	children: children;
	bg: string;
	text: string;
}
export interface IToastOptions extends UseToastOptions {
	txHash?: string;
}

export type TToastState = IToastOptions;

export interface IToastyProviderValue {
	toast: setType<TToastState>;
	state: TToastState;
}

export const ToastyContext = createContext({} as IToastyProviderValue);

export const ToastyProvider: React.FC<IToastyProviderProps> = ({
	children,
	bg,
	text,
}) => {
	const [state, setState] = useState<TToastState>({});
	const toast = useToast();
	const [isMobile] = useMediaQuery("(max-width: 480px)");

	useEffect(() => {
		if (!state || !Object.keys(state).length) return;

		if (!toast.isActive(state?.id ?? "")) {
			toast({
				...state,
				id: state?.id,
				duration: 5000,
				position: isMobile ? "top" : "top-right",
				isClosable: true,
				status: state?.status,
				title: state?.title,
				description: state?.description,

				render: ({ onClose }) => (
					<ToastyCard bg={bg} text={text} onClose={onClose} state={state} />
				),
			});
		}
	}, [state]);

	const providerValue = useMemo(
		() => ({ state, toast: setState }),
		[state, setState]
	);

	return (
		<ToastyContext.Provider value={providerValue}>
			{children}
		</ToastyContext.Provider>
	);
};
