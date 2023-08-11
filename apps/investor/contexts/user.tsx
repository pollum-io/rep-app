import React, { createContext, useState, useMemo, useEffect } from "react";
import { fetchGetInvestorPFById } from "../services/fetchGetInvestorPFById";
import { fetchGetInvestorPJById } from "../services/fetchGetInvestorPJById";
import PersistentFramework from "../utils/persistent";
interface IRegister {
	setUserInfos: React.Dispatch<React.SetStateAction<string>>;
	getUserInfos: (id: string) => Promise<void>;
	userInfos: string;
	username: string;
	isInvestor: boolean;
	setIsInvestor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext({} as IRegister);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
	const [isInvestor, setIsInvestor] = useState<boolean>(false);

	const [userInfos, setUserInfos] = useState<string>();
	const [username, setUsername] = useState<string>();

	const getUserInfos = async (id: string) => {
		let name = "";
		setUserInfos(id);

		const investorPF = await fetchGetInvestorPFById(userInfos);
		const investorPJ = await fetchGetInvestorPJById(userInfos);

		name = investorPF
			? investorPF?.data?.full_name
			: investorPJ?.data?.full_name;
		setUsername(name);
		setIsInvestor(true);
		PersistentFramework.add("name", String(name));
		PersistentFramework.add("isInvestor", { isInvestor: true });
		PersistentFramework.add("id", String(id));
	};

	useEffect(() => {
		if (!userInfos) {
			const id = PersistentFramework.get("id");
			PersistentFramework.add("id", String(id));
			setUserInfos(String(id));
			return;
		}
		if (!username) {
			const name = PersistentFramework.get("name");
			PersistentFramework.add("name", String(name));
			setUsername(String(name));
			return;
		}
		if (isInvestor) {
			const investor = PersistentFramework.get("isInvestor") as {
				[k: string]: boolean;
			};
			if (investor?.isInvestor === true) {
				setIsInvestor(true);
			} else {
				setIsInvestor(false);
			}
			return;
		} else {
			return;
		}
	}, [isInvestor, userInfos, username]);

	const providerValue = useMemo(
		() => ({
			isUserLogged,
			setIsUserLogged,
			userInfos,
			getUserInfos,
			username,
			setUserInfos,
			isInvestor,
			setIsInvestor,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isUserLogged, userInfos, username]
	);

	return (
		<UserContext.Provider value={providerValue}>
			{children}
		</UserContext.Provider>
	);
};
