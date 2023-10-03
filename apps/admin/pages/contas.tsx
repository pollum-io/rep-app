import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { AccountsContainer } from "../container/Accounts";

// interface IPage {
// 	example: string;
// }

const Accounts: NextPage = () => <AccountsContainer />;

export default Accounts;

// export const getServerSideProps: GetServerSideProps = async ({
// 	req,
// 	query,
// }) => {
// 	return {};
// };
