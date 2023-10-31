import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { GeneralPanelContainer } from "../container/GeneralPanel";
import { fetchGetAdmin, fetchGetContact } from "services";
import { UserLogin } from "ui";

interface IGeneralPanel {
	requestAdmin: any;
}

const GeneralPanel: NextPage<IGeneralPanel> = ({ requestAdmin }) => (
	<GeneralPanelContainer adminData={requestAdmin} />
);

export default GeneralPanel;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const token = req.cookies["livn_auth"];

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

	const requestAdmin = await fetchGetAdmin();

	return {
		props: {
			requestAdmin: null,
			token: token,
		},
	};
};
