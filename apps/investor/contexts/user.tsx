import React, { createContext, useState, useMemo, useEffect } from "react";
import { fetchGetInvestorPFById } from "../services/fetchGetInvestorPFById";
import { fetchGetInvestorPJById } from "../services/fetchGetInvestorPJById";
import PersistentFramework from "../utils/persistent";
interface IRegister {
	setUserInfos: any;
	getInfosId: any;
	getInfos: any;
	userInfos: any;
	username: string;
	isInvestor: boolean;
	setIsInvestor: any;
}

export const UserContext = createContext({} as IRegister);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
	const [isInvestor, setIsInvestor] = useState<boolean>(false);

	const [userInfos, setUserInfos] = useState<any>();
	const [username, setUsername] = useState<any>();

	const getInfosId = async (data: any) => {
		setUserInfos(data);

		PersistentFramework.add("id", String(data));
	};

	const getInfos = async (id: any) => {
		let name: string = "";
		const response = await fetchGetInvestorPFById(userInfos, id);
		const enterprise = await fetchGetInvestorPJById(userInfos, id);

		if (response?.data?.full_name) {
			name = response?.data?.full_name;
			setUsername(name);
			setIsInvestor(true);
			PersistentFramework.add("name", String(name));
			PersistentFramework.add("isInvestor", { isInvestor: true });
		} else {
			name = enterprise?.data?.full_name;
			setUsername(name);
			setIsInvestor(false);
			PersistentFramework.add("name", String(name));
			PersistentFramework.add("isInvestor", { isInvestor: false });
		}
	};

	useEffect(() => {
		if (!userInfos) {
			const id = PersistentFramework.get("id");
			PersistentFramework.add("id", String(id));
			setUserInfos(id);
			return;
		}
		if (!username) {
			const name = PersistentFramework.get("name");
			PersistentFramework.add("name", String(name));
			setUsername(name);
			return;
		}
		if (isInvestor) {
			const investor = PersistentFramework.get("isInvestor") as {
				[k: string]: any;
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
			getInfos,
			username,
			setUserInfos,
			getInfosId,
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
