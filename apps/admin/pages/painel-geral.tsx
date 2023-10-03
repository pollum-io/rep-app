import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { GeneralPanelContainer } from "../container/GeneralPanel";

// interface IPage {
// 	example: string;
// }

const Page: NextPage = () => <GeneralPanelContainer />;

export default Page;

// export const getServerSideProps: GetServerSideProps = async ({
// 	req,
// 	query,
// }) => {
// 	return {};
// };
