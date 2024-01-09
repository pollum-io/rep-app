import React, { createContext, useState, useMemo } from "react";

interface IOpportunitiesData {
	enterprise_name: string;
	name: string;
	localizacao: string;
	min_investment: number;
	init_date: string;
	expected_delivery_date: string;
	profitability: number;
	opportunity_resume: {
		total_deadline: number;
		percentage_final_return: number;
		min_invest: number;
		return_descritption: number;
	};
	opportunities_details: {
		total_units: number;
		constructed_area: number;
		estimated_vgv: number;
		average_price: number;
		technical_description: string;
	};
	approval_process: string;
	description: string;
	pictures_enterprise: string[]; // esse é o selectedOpportunitiesPictures
	opportunity_resume_files: Array<{ name: string; file: any }>; // esse é o array docs
	incorporation_enrollment: string;
	estimated_timeline: [
		{
			year: string;
			quarter: string | number;
			info: [
				{
					name: string;
					status: string;
				}
			];
		}
	];
	disbursement_schedule: [
		{
			year: number;
			info: [
				{
					month: string | Date;
					value: number;
				}
			];
		}
	];
	blueprints: Array<{ name: string; file: any }>;
	schedule_table: [
		{
			period: string | Date;
			cost: number;
			total_revenue: number;
			units_sold: number;
		}
	];
	business_details: {
		business_structure: unknown;
		business_disclaimer: string;
	};
}

interface ICreateCompany {
	opportunitiesFormData: IOpportunitiesData;
	setOpportunitiesFormData: React.Dispatch<
		React.SetStateAction<IOpportunitiesData>
	>;
}

export const CreateOpportuntyContext = createContext({} as ICreateCompany);

export const CreateOpportuntyProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [opportunitiesFormData, setOpportunitiesFormData] =
		useState<IOpportunitiesData>({
			enterprise_name: "",
			name: "",
			localizacao: "",
			min_investment: null,
			init_date: "",
			expected_delivery_date: "",
			profitability: null,
			opportunity_resume: {
				total_deadline: null,
				percentage_final_return: null,
				min_invest: null,
				return_descritption: null,
			},
			opportunities_details: {
				total_units: null,
				constructed_area: null,
				estimated_vgv: null,
				average_price: null,
				technical_description: null,
			},
			approval_process: "",
			description: "",
			pictures_enterprise: [], // esse é o selectedOpportunitiesPictures
			opportunity_resume_files: [{ name: "", file: null }], // esse é o array docs
			incorporation_enrollment: "",
			estimated_timeline: [
				{
					year: "",
					quarter: "",
					info: [
						{
							name: "",
							status: "",
						},
					],
				},
			],
			disbursement_schedule: [
				{
					year: null,
					info: [
						{
							month: "",
							value: null,
						},
					],
				},
			],
			blueprints: [{ name: "", file: "" }],
			schedule_table: [
				{
					period: null,
					cost: null,
					total_revenue: null,
					units_sold: null,
				},
			],
			business_details: {
				business_structure: "",
				business_disclaimer: "",
			},
		});
	console.log(opportunitiesFormData, "opportunitiesFormData");
	const providerValue = useMemo(
		() => ({
			opportunitiesFormData,
			setOpportunitiesFormData,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[opportunitiesFormData]
	);

	return (
		<CreateOpportuntyContext.Provider value={providerValue}>
			{children}
		</CreateOpportuntyContext.Provider>
	);
};
