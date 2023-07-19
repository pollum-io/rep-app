import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import Opportunity from "../../../models/oportunity";
import Enterprise from "../../../models/enterprise";
import { verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";
import queryParser from "../../../lib/queryParser";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const OpportunitySchema = z.object({
	name: z.string().max(60),
	address: z.optional(z.object({} as { [key: string]: z.ZodTypeAny })),
	enterprise_id: z.string(),
	min_investment: z.number(),
	init_date: z.string().datetime({ offset: true }),
	expected_delivery_date: z.string().datetime({ offset: true }),
	end_date: z.string().datetime({ offset: true }),
	profitability: z.number(),
	cub_current: z.optional(z.number()),
	cub_expected: z.optional(z.number()),
	description: z.string(),
	general_info: z.array(z.string()),
	event_ensuing: z.optional(z.object({} as { [key: string]: z.ZodTypeAny })),
	neighbor_description: z.string(),
	pictures_neighbor: z.array(z.string()),
	pictures_enterprise: z.array(z.string()),
	sale_end_at: z.optional(z.string()),
	token_address: z.optional(z.string()),
	token_price: z.optional(z.number()),
	token_minted: z.optional(z.number()),
	token_supply: z.optional(z.number()),
	enterprise_type: z.string(),
	description_extra: z.optional(z.string()),
	picture_extra: z.optional(z.array(z.string())),
	enterprise_name: z.optional(z.string().max(60)),
	approval_process: z.optional(
		z.array(z.object({} as { [key: string]: z.ZodTypeAny }))
	),
	licensing_process: z.optional(
		z.array(z.object({} as { [key: string]: z.ZodTypeAny }))
	),
	incorporation_enrollment: z.optional(
		z.array(z.object({} as { [key: string]: z.ZodTypeAny }))
	),
	sub_categories: z.optional(z.array(z.string())),
});

const fetchSchema = z.object({
	page: z.optional(z.preprocess(Number, z.number())),
	limit: z.optional(z.preprocess(Number, z.number())),
	min_investment: z.optional(z.string()),
	enterprise_id: z.optional(z.string()),
	enterprise_type: z.optional(z.string()),
	expected_delivery_date: z.optional(z.string()),
});

router.post(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const opportunitiyData = req.body;

		const enterprise = await Enterprise.findById(
			opportunitiyData.enterprise_id
		).lean();

		OpportunitySchema.parse(opportunitiyData);

		const opportunity = await Opportunity.create({
			...opportunitiyData,
			enterprise_logo: enterprise.enterprise_logo,
		});

		res.status(201).json({ data: opportunity });
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

		const queryFilter = {
			fields: ["enterprise_type", "enterprise_id"],
			values: {},
		};

		const querySort = {
			fields: ["expected_delivery_date", "min_investment"],
			values: { Mínimo: 1, Máximo: -1, Crescente: 1, Decrescente: -1 },
		};

		const filter = queryParser(req.query, queryFilter);

		const sort = queryParser(req.query, querySort);

		const page = +req.query.page ? +req.query.page - 1 : 0;
		const limit = +req.query.limit || 12;

		const results = await Opportunity.countDocuments(filter).sort({
			createdAt: -1,
			...sort,
		});

		const totalPages = Math.ceil(results / limit);

		const opportunities = await Opportunity.find(filter)
			.limit(limit)
			.skip(page * limit)
			.sort({ createdAt: -1, ...sort });

		const response = { data: opportunities, totalPages, results };

		res.status(200).json(response);
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
