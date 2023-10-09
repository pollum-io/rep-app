import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { GeneralPanelContainer } from "../container/GeneralPanel";
import { fetchGetAdmin, fetchGetContact } from "services";

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
	const requestAdmin = await fetchGetAdmin();

	return {
		props: {
			requestAdmin: null,
		},
	};
};
