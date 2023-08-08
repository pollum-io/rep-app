import { GetServerSideProps, NextPage } from "next";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";
import { CompanieContainer } from "../../container";
import { fetchEnterpriseById } from "../../services/fetchEnterpriseById";

interface ICompanieProps {
	data: ICompaniesDetails;
}

const Companie: NextPage<ICompanieProps> = ({ data }) => {
	return <CompanieContainer data={data} />;
};

export default Companie;

export const getServerSideProps: GetServerSideProps = async ({
	query,
	req,
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
	const response = await fetchEnterpriseById(String(query.enterprise_id));

	return {
		props: {
			data: response?.data,
		},
	};
};
