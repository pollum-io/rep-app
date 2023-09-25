import { NextPage } from "next";
import { Login } from "../../components/Pages/Login";
interface ILogin {
	token: string;
}

export const LoginContainer: NextPage<ILogin> = ({ token }) => (
	<Login token={token} />
);
