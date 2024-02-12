import React, { FunctionComponent, useLayoutEffect } from "react";
import { DefaultTemplate } from "../DefaultTemplate";
import { motion } from "framer-motion";
import { CompaniePage } from "../../components/Pages/CompaniePage";
import { useUser } from "../../hooks/useUser";

interface IMyProfileProps {
	token: string;
	enterpriseId: string;
	enterpriseData: unknown;
}

export const MyProfileContainer: FunctionComponent<IMyProfileProps> = ({
	enterpriseId,
	token,
	enterpriseData,
}) => {
	const { getUserInfos } = useUser();

	useLayoutEffect(() => {
		getUserInfos(enterpriseId, token);
	}, [enterpriseId, getUserInfos, token]);

	return (
		<DefaultTemplate>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<CompaniePage companieDetail={enterpriseData} />
			</motion.div>
		</DefaultTemplate>
	);
};
