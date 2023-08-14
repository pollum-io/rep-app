import { FunctionComponent, useEffect } from "react";
import { CompaniePage } from "../../components/CompaniePage";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { UserDataPF } from "../../dtos/UserPF";
import { UserDataPJ } from "../../dtos/UserPJ";
import { useUser } from "../../hooks/useUser";
import { DefaultTemplate } from "../DefaultTemplate";

interface ICompanieProps {
	data: ICompaniesDetails;
	user: UserInfo;
	token: string;
}

export const CompanieContainer: FunctionComponent<ICompanieProps> = ({
	data,
	user,
	token,
}) => {
	const { getUserInfos } = useUser();

	useEffect(() => {
		getUserInfos(
			user?.investor_pf === null ? user?.investor_pj : user?.investor_pf,
			token
		);
	}, [getUserInfos, token, user?.investor_pf, user?.investor_pj]);

	return (
		<DefaultTemplate>
			<CompaniePage companieDetail={data} />
		</DefaultTemplate>
	);
};
