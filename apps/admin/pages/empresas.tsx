import jwt_decode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import { CompaniesContainer } from "../container/CompaniesControll";

// interface IPage {
// 	example: string;
// }

const Company: NextPage = () => <CompaniesContainer />;

export default Company;

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

// return {}

// };
