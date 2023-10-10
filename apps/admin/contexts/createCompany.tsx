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
	entepriseId: string;
	setEntepriseId: React.Dispatch<React.SetStateAction<string>>;
	haveCompanyCreateInProcess: boolean;
	setHaveCompanyCreateInProcess: React.Dispatch<React.SetStateAction<boolean>>;
	banner: any;
	setBanner: any;
	logo: any;
	setLogo: any;
	handleHasCompanyBeingCreated: any;
}

type CreateData = {
	email?: string;
	nome?: string;
	localizacao?: string;

	cnpj?: string;
	contact_number?: string;
	logo?: any;
	banner?: any;
	description?: string;
	companyMember?: Array<{ image?: string; name?: string; position?: string }>;
	enterprise_info?: {
		obrasEntregues?: any;
		obrasAndamento?: any;
		vgv?: any;
	};
	social_media: {
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
};

type companyMember = {
	image?: any;
	name?: string;
	position?: string;
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
		cnpj: "",
		logo: null,
		banner: null,
		description: "",
		companyMember: [],
		contact_number: "",
		enterprise_info: {
			obrasEntregues: "",
			obrasAndamento: "",
			vgv: "",
		},
		social_media: {
			contactEmail: "",
			whatsapp: "",
			contactPhone: "",
			instagram: "",
			facebook: "",
			telegram: "",
			twitter: "",
			jusbrasil: "",
			website: "",
			reclame: "",
		},
	});
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isNotCretedYet, setIsNotCretedYet] = useState<boolean>(false);
	const [entepriseId, setEntepriseId] = useState<string>("");
	const [haveCompanyCreateInProcess, setHaveCompanyCreateInProcess] =
		useState<boolean>(false);
	const [banner, setBanner] = useState<any>();
	const [logo, setLogo] = useState<any>();

	const [members, setMembers] = useState<companyMember[]>([
		{ image: null, name: "", position: "" },
	]);
	const [companyImages, setCompanyImages] = useState<CompanyImages>({
		logo: null,
		banner: null,
		membersImages: [],
	});

	const handleSaveFormData = () => {
		PersistentFramework.add("formData", JSON.stringify(companyFormData));
	};

	const handleHasCompanyBeingCreated = (value: boolean) => {
		setHaveCompanyCreateInProcess(value);
		PersistentFramework.add("companyBeingCreated", value);
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
			entepriseId,
			setEntepriseId,
			haveCompanyCreateInProcess,
			setHaveCompanyCreateInProcess,
			banner,
			setBanner,
			logo,
			setLogo,
			handleHasCompanyBeingCreated,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			companyFormData,
			isCreating,
			isEditing,
			isNotCretedYet,
			members,
			companyImages,
			entepriseId,
			haveCompanyCreateInProcess,
			banner,
			logo,
		]
	);

	return (
		<CreateCompanyContext.Provider value={providerValue}>
			{children}
		</CreateCompanyContext.Provider>
	);
};
