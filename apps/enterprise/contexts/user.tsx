import React, { createContext, useState, useMemo, useEffect } from "react";
import { fetchGetInvestorPFById, fetchGetInvestorPJById } from "services";
import { PersistentFramework } from "ui";

interface IRegister {
	setUserInfos: React.Dispatch<React.SetStateAction<string>>;
	getUserInfos: (id: string, token?: string) => Promise<void>;
	userInfos: string;
	username: string;
	isInvestor: boolean;
	setIsInvestor: React.Dispatch<React.SetStateAction<boolean>>;
	firstAccess: boolean;
	setFirstAccess?: React.Dispatch<React.SetStateAction<boolean>>;
	isInvestorPerfilCompleted?: boolean;
	setIsInvestorPerfilCompleted?: React.Dispatch<React.SetStateAction<boolean>>;
	docLink: string;
	setDocLink: React.Dispatch<React.SetStateAction<string>>;
	investmentId: string;
	setInvestmentId: React.Dispatch<React.SetStateAction<string>>;
	contributionId: string;
	setContributionId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as IRegister);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
	const [isInvestor, setIsInvestor] = useState<boolean>(false);
	const [isInvestorPerfilCompleted, setIsInvestorPerfilCompleted] =
		useState<boolean>(false);

	const [userInfos, setUserInfos] = useState<string>();
	const [username, setUsername] = useState<string>();
	const [firstAccess, setFirstAccess] = useState<boolean>();

	const [docLink, setDocLink] = useState<string | undefined>("");
	const [investmentId, setInvestmentId] = useState<string | undefined>("");
	const [contributionId, setContributionId] = useState<string | undefined>("");

	const getUserInfos = async (id: string, token?: string) => {
		let name = "";
		setUserInfos(id);

		const investorPF = await fetchGetInvestorPFById(id, token);

		if (investorPF) {
			name = investorPF.data?.full_name;
			setUsername(name);
			setIsInvestor(true);
			setIsInvestorPerfilCompleted(
				investorPF?.data?.is_profile_filled === true ? true : false
			);
			PersistentFramework.add("name", String(name));
			PersistentFramework.add("isInvestor", { isInvestor: true });
			PersistentFramework.add("id", String(id));
			return;
		}

		const investorPJ = await fetchGetInvestorPJById(id, token);
		if (investorPJ) {
			name = investorPJ.data?.full_name;
			setUsername(name);
			setIsInvestor(true);
			setIsInvestorPerfilCompleted(
				investorPJ?.data?.is_profile_filled === true ? true : false
			);
			PersistentFramework.add("name", String(name));
			PersistentFramework.add("isInvestor", { isInvestor: true });
			PersistentFramework.add("id", String(id));
		}
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
	}, [isInvestor, userInfos, username, contributionId]);

	// useEffect(() => {
	// 	const contractLink = PersistentFramework.get("signContract") as {
	// 		[k: string]: string;
	// 	};
	// 	const investmentCheckoutId = PersistentFramework.get("investmentId") as {
	// 		[k: string]: string;
	// 	};
	// 	const contributionIdStorage = PersistentFramework.get("contributionId") as {
	// 		[k: string]: string;
	// 	};
	// 	console.log(contributionId, "contributionId");
	// 	console.log(investmentId, "investmentId");

	// 	setDocLink(String(contractLink));
	// 	setInvestmentId(String(investmentCheckoutId));
	// 	setContributionId(String(contributionIdStorage));
	// }, [docLink, investmentId, contributionId]);
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
			firstAccess,
			setFirstAccess,
			isInvestorPerfilCompleted,
			docLink,
			setDocLink,
			investmentId,
			setInvestmentId,
			contributionId,
			setContributionId,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			isUserLogged,
			userInfos,
			username,
			investmentId,
			contributionId,
			docLink,
			isInvestorPerfilCompleted,
		]
	);

	return (
		<UserContext.Provider value={providerValue}>
			{children}
		</UserContext.Provider>
	);
};
