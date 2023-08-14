import type { GetServerSideProps, NextPage } from "next";
import { Change_PasswordContainer } from "../container";
import { fetchCodeVerify } from "../services/fetchCodeVerify";

interface IChangePasswordData {
	code?: string;
	isValid?: boolean;
}

const Change_Password: NextPage<IChangePasswordData> = ({ code, isValid }) => (
	<Change_PasswordContainer code={code} isValid={isValid} />
);

export default Change_Password;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const response = await fetchCodeVerify(String(query.code));

	if (!response?.data?.isValid) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	return {
		props: {
			code: query.code,
			isValid: response?.data?.isValid,
		},
	};
};
