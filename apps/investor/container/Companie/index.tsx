import { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { CompaniePage } from "../../components/CompaniePage";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";
import { UserInfo } from "../../dtos/GlobalUserInfo";
import { useUser } from "../../hooks/useUser";
import { DefaultTemplate } from "../DefaultTemplate";
import { motion } from "framer-motion"; // Import motion from framer-motion

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

	useLayoutEffect(() => {
		getUserInfos(
			user?.investor_pf === null ? user?.investor_pj : user?.investor_pf,
			token
		);
	}, [getUserInfos, token, user?.investor_pf, user?.investor_pj]);
	return (
		<DefaultTemplate>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<CompaniePage companieDetail={data} />
			</motion.div>
		</DefaultTemplate>
	);
};
