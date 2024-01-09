import { GetServerSideProps, NextPage } from "next";
import { RegisterContainer } from "../container";
import jwt_decode from "jwt-decode";

const Registrar: NextPage = props => <RegisterContainer {...props} />;

export default Registrar;
