import type { GetServerSideProps, NextPage } from "next";
import { fetchCodeVerify } from "../services/fetchCodeVerify";
import { CreatePasswordContainer } from "../container/CreatePassword";

interface ICreatePasswordData {
	code?: string;
	isValid?: boolean;
}

const Create_Password: NextPage<ICreatePasswordData> = ({ code, isValid }) => (
	<CreatePasswordContainer code={code} isValid={isValid} />
);

export default Create_Password;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const host = req.headers.host;
	const response = await fetchCodeVerify(String(query.code), host);

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
