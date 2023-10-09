import React, { createContext, useState, useMemo, useEffect } from "react";
import { PersistentFramework } from "ui";

interface ICreateCompany {
	companyFormData: CreateData;
	setCompanyFormData: React.Dispatch<React.SetStateAction<CreateData>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	isNotCretedYet: boolean;
	setIsNotCretedYet: React.Dispatch<React.SetStateAction<boolean>>;
	isCreating: boolean;
	setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
	handleSaveFormData: any;
	members: any;
	setMembers: any;
	companyImages: any;
	setCompanyImages: any;
}

type CreateData = {
	email?: string;
	nome?: string;
	localizacao?: string;
	obrasEntregues?: any;
	obrasAndamento?: any;
	vgv?: any;
	cnpj?: string;
	logo?: any;
	banner?: any;
	description?: string;
	companyMember?: companyMember[];
	contactEmail?: string;
	whatsapp?: string;
	website?: string;
	contactPhone?: string;
	instagram?: string;
	facebook?: string;
	telegram?: string;
	twitter?: string;
	jusbrasil?: string;
	reclame: string;
};

type companyMember = {
	foto?: any;
	nome?: string;
	cargo?: string;
};

type CompanyImages = {
	logo: any;
	banner: any;
	membersImages: any[];
};

export const CreateCompanyContext = createContext({} as ICreateCompany);

export const CreateCompanyProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [companyFormData, setCompanyFormData] = useState<CreateData>({
		email: "",
		nome: "",
		localizacao: "",
		obrasEntregues: "",
		obrasAndamento: "",
		vgv: "",
		cnpj: "",
		logo: null,
		banner: null,
		description: "",
		website: "",
		companyMember: [],
		contactEmail: "",
		whatsapp: "",
		contactPhone: "",
		instagram: "",
		facebook: "",
		telegram: "",
		twitter: "",
		jusbrasil: "",
		reclame: "",
	});
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isNotCretedYet, setIsNotCretedYet] = useState<boolean>(false);
	const [members, setMembers] = useState<companyMember[]>([
		{ foto: null, nome: "", cargo: "" },
	]);
	const [companyImages, setCompanyImages] = useState<CompanyImages>({
		logo: null,
		banner: null,
		membersImages: [],
	});
	const handleSaveFormData = () => {
		PersistentFramework.add("formData", JSON.stringify(companyFormData));
	};

	useEffect(() => {
		const getformData = PersistentFramework.get("formData");
		if (getformData) {
			setCompanyFormData(JSON?.parse(getformData));
			const companyMemberData = companyFormData?.companyMember?.map(
				(data) => data
			);
			setMembers(companyMemberData);
			const isSomeValueIncompleted = Object.values(companyFormData)?.some(
				(valor) => valor === ""
			);
			if (isSomeValueIncompleted === true) {
				setIsNotCretedYet(true);
			}
		}
	}, [isCreating]);

	console.log(companyImages, "companyImages");
	console.log(companyFormData, "companyFormData");

	const providerValue = useMemo(
		() => ({
			companyFormData,
			setCompanyFormData,
			isEditing,
			setIsEditing,
			isNotCretedYet,
			setIsNotCretedYet,
			isCreating,
			setIsCreating,
			handleSaveFormData,
			members,
			setMembers,
			companyImages,
			setCompanyImages,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			companyFormData,
			isCreating,
			isEditing,
			isNotCretedYet,
			members,
			companyImages,
		]
	);

	return (
		<CreateCompanyContext.Provider value={providerValue}>
			{children}
		</CreateCompanyContext.Provider>
	);
};
