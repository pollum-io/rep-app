import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { GeneralPanelContainer } from "../container/GeneralPanel";
import { UserLogin } from "ui";

interface IGeneralPanel {
	requestAdmin: unknown;
}

const GeneralPanel: NextPage<IGeneralPanel> = ({ requestAdmin }) => (
	<GeneralPanelContainer adminData={requestAdmin} />
);

export default GeneralPanel;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = req.cookies["adm_auth"];

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	const user: UserLogin = jwt_decode(token);

	if (!user?.admin) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {
				user,
				token,
			},
		};
	}

	return {
		props: {
			requestAdmin: null,
			token: token,
		},
	};
};
