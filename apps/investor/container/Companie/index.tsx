import { FunctionComponent } from "react";
import { CompaniePage } from "../../components/Companie";
import { ICompaniesDetails } from "../../components/Companies/CompaniesCard/dto";
import { DefaultTemplate } from "../DefaultTemplate";

interface ICompanieProps {
	data: ICompaniesDetails;
}

export const CompanieContainer: FunctionComponent<ICompanieProps> = ({
	data,
}) => {
	return (
		<DefaultTemplate>
			<CompaniePage companieDetail={data} />
		</DefaultTemplate>
	);
};
