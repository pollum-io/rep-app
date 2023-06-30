import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

import { generateToken, setCookie, verifyUser } from "../../../lib/auth";
import dbConnect from "../../../lib/dbConnect";
import { ApiResponse } from "../../../models/ApiResponse";
import Enterprise from "../../../models/enterprise";
import User from "../../../models/user";
import { getAvailableAndClosedOpportunities } from "./[id]";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const InsertSchema = z.object({
	enterprise_name: z.string().max(60),
	enterprise_logo: z.optional(z.string()),
	enterprise_banner: z.optional(z.string()),
	cnpj: z.string().max(14),
	site_url: z.optional(z.string().max(40)),
	address: z.optional(z.object({} as { [key: string]: any })),
	email: z.optional(z.string()),
	contact_number: z.optional(z.string()),
	social_media: z.optional(z.object({} as { [key: string]: any })),
	description: z.optional(z.string()),
	team: z.optional(z.array(z.object({} as { [key: string]: any }))),
	enterprise_info: z.optional(z.object({} as { [key: string]: any })),
	kyc_approved: z.optional(z.boolean()),
	aum: z.optional(z.number()),
	wallet_address: z.optional(z.string()),
	investments: z.optional(z.array(z.any())),
	invited_by: z.string(),
	uf: z.string(),
});

const fetchSchema = z.object({
	page: z.optional(z.preprocess(Number, z.number())),
	limit: z.optional(z.preprocess(Number, z.number())),
});

router.post(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const enterpriseData = req.body;
		const user = req?.user;

		InsertSchema.parse(enterpriseData);

		const enterpriseExists = await Enterprise.findOne({
			cnpj: enterpriseData.cnpj,
		});

		if (enterpriseExists) {
			return res.status(400).json({
				error: "CNPJ already registered",
			});
		}

		const enterprise = await Enterprise.create(enterpriseData);

		const updatedUser = await User.findOneAndUpdate(
			{ _id: user?.id },
			{ enterprise_id: enterprise._id },
			{ new: true }
		);

		const token = generateToken(updatedUser);

		setCookie(res, "livn_auth", token);

		res.status(201).json({ data: enterprise });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({
				error: !/^[\[|\{](\s|.*|\w)*[\]|\}]$/.test(error.message)
					? error.message
					: JSON.parse(error.message),
			});
		}
	}
});

router.get(async (req, res) => {
	try {
		await dbConnect();

		fetchSchema.parse(req.query);

		const page = (req.query.page as any) ? (req.query.page as any) - 1 : 0;
		const limit: number = (req.query.limit as any) || 12;
		const totalPages = Math.ceil((await Enterprise.countDocuments({})) / limit);

		let enterprises = await Enterprise.find({})
			.limit(limit)
			.skip(page * limit)
			.sort({ createdAt: -1 })
			.lean();

		const ids = enterprises.map(
			(enterprise) => new mongoose.Types.ObjectId(enterprise._id)
		);

		const oppData = await getAvailableAndClosedOpportunities(String(ids));
		const defaultOppData = {
			opportunities_closed: 0,
			opportunities_available: 0,
		};

		enterprises = enterprises.map((enterprise: any) => {
			const hasOpportunities = oppData.find(
				(item: any) => `${item._id}` === `${enterprise._id}`
			);

			return (enterprise = {
				...enterprise,
				...(hasOpportunities || defaultOppData),
			});
		});

		res.status(200).json({ data: enterprises, totalPages });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({
				error: !/^[\[|\{](\s|.*|\w)*[\]|\}]$/.test(error.message)
					? error.message
					: JSON.parse(error.message),
			});
		}
	}
});

export default router;
