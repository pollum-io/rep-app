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
	handleSaveFormData: unknown;
	members: unknown;
	setMembers: unknown;
	companyImages: unknown;
	setCompanyImages: unknown;
	entepriseId: string;
	setEntepriseId: React.Dispatch<React.SetStateAction<string>>;
	haveCompanyCreateInProcess: boolean;
	setHaveCompanyCreateInProcess: React.Dispatch<React.SetStateAction<boolean>>;
	banner: unknown;
	setBanner: unknown;
	logo: unknown;
	setLogo: unknown;
	handleHasCompanyBeingCreated: unknown;
	deleteAllDataFromStateCompanyForm: unknown;
}

type CreateData = {
	email?: string;
	enterprise_name?: string;
	localizacao?: string;
	cnpj?: string;
	contact_number?: string;
	enterprise_logo?: unknown;
	enterprise_banner?: unknown;
	description?: string;
	team?: Array<{ image?: string; name?: string; position?: string }>;
	enterprise_info?: {
		delivered_enterprises?: number;
		in_progress?: number;
		total_vgv?: number;
	};
	social_media: {
		contactEmail?: string;
		whatsapp?: string;
		website?: string;
		telephone?: string;
		instagram?: string;
		facebook?: string;
		telegram?: string;
		twitter?: string;
		jusbrasil?: string;
		reclame: string;
	};
};

type companyMember = {
	image?: unknown;
	name?: string;
	position?: string;
};

type CompanyImages = {
	enterprise_logo: unknown;
	enterprise_banner: unknown;
	membersImages: unknown[];
};

const companyFormDataFirstInputs = {
	email: "",
	enterprise_name: "",
	localizacao: "",
	cnpj: "",
	enterprise_logo: null,
	enterprise_banner: null,
	description: "",
	team: [],
	enterprise_info: {
		delivered_enterprises: null,
		in_progress: null,
		total_vgv: null,
	},
};

export const CreateCompanyContext = createContext({} as ICreateCompany);

export const CreateCompanyProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [companyFormData, setCompanyFormData] = useState<CreateData>({
		email: "",
		enterprise_name: "",
		localizacao: "",
		cnpj: "",
		enterprise_logo: null,
		enterprise_banner: null,
		description: "",
		team: [],
		contact_number: "",
		enterprise_info: {
			delivered_enterprises: null,
			in_progress: null,
			total_vgv: null,
		},
		social_media: {
			contactEmail: "",
			whatsapp: "",
			telephone: "",
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
	const [banner, setBanner] = useState<unknown>();
	const [logo, setLogo] = useState<unknown>();

	const [members, setMembers] = useState<companyMember[]>([
		{ image: null, name: "", position: "" },
	]);
	const [companyImages, setCompanyImages] = useState<CompanyImages>({
		enterprise_logo: null,
		enterprise_banner: null,
		membersImages: [],
	});

	// Função zerar os estados de controle no form
	function deleteAllDataFromStateCompanyForm() {
		setCompanyFormData({
			email: "",
			enterprise_name: "",
			localizacao: "",
			cnpj: "",
			enterprise_logo: null,
			enterprise_banner: null,
			description: "",
			team: [],
			contact_number: "",
			enterprise_info: {
				delivered_enterprises: null,
				in_progress: null,
				total_vgv: null,
			},
			social_media: {
				contactEmail: "",
				whatsapp: "",
				telephone: "",
				instagram: "",
				facebook: "",
				telegram: "",
				twitter: "",
				jusbrasil: "",
				website: "",
				reclame: "",
			},
		});
		setCompanyImages({
			enterprise_logo: null,
			enterprise_banner: null,
			membersImages: [],
		});
	}

	const handleSaveFormData = () => {
		if (isEditing) {
			PersistentFramework.add("formDataEdit", JSON.stringify(companyFormData));
		} else if (!isEditing) {
			PersistentFramework.add("formData", JSON.stringify(companyFormData));
		}
	};

	const handleHasCompanyBeingCreated = (value: boolean) => {
		setHaveCompanyCreateInProcess(value);
		PersistentFramework.add("companyBeingCreated", value);
	};

	useEffect(() => {
		let getformData: unknown;
		let getformDataEdit: unknown;

		if (isEditing) {
			getformDataEdit = PersistentFramework.get("formDataEdit");
			if (getformDataEdit) {
				setCompanyFormData(JSON?.parse(getformDataEdit));
				const companyMemberData = companyFormData?.team?.map((data) => data);
				setMembers(companyMemberData);
			}
		} else if (!isEditing) {
			getformData = PersistentFramework.get("formData");
			if (getformData) {
				setCompanyFormData(JSON?.parse(getformData));
				const companyMemberData = companyFormData?.team?.map((data) => data);
				setMembers(companyMemberData);
			}
		}
	}, [isCreating, isEditing]);

	useEffect(() => {
		const isSomeValueIncompleted = Object.values(companyFormData)?.some(
			(valor) => valor === "" || valor === null
		);
		if (isSomeValueIncompleted === true) {
			setIsNotCretedYet(true);
		} else {
			setIsNotCretedYet(false);
		}
	}, [companyFormData, isNotCretedYet]);

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
			deleteAllDataFromStateCompanyForm,
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
