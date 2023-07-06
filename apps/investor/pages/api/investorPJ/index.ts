import { NextApiRequest, NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { generateToken, setCookie, verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";
import investorPJ from "../../../models/investor.pj";

interface NextConnectApiRequest extends NextApiRequest {
	user?: {
		id: string;
		investor_pj: string;
		email: string;
		iat: number;
		exp: number;
	};
}

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(
		error,
		req: NextConnectApiRequest,
		res: NextApiResponse<ResponseData>
	) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const insertSchema = z.object({
	full_name: z.string().max(60),
	cnpj: z.string().max(14),
	uf: z.string(),
	email: z.optional(z.string()),
	contact_number: z.optional(z.string()),
	address: z.optional(z.object({} as { [key: string]: z.ZodTypeAny })),
	legal_representatives: z.optional(
		z.array(z.object({} as { [key: string]: z.ZodTypeAny }))
	),
	partners: z.optional(
		z.array(z.object({} as { [key: string]: z.ZodTypeAny }))
	),
	invited_by: z.string(),
});

router.post(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const investorData = req.body;

		const user = req?.user;

		insertSchema.parse(investorData);

		const investorExists = await investorPJ.findOne({
			cnpj: investorData.cnpj,
		});

		if (investorExists) {
			return res.status(400).json({
				error: "CNPJ already registered",
			});
		}

		const investor = await investorPJ.create(investorData);

		const updatedUser = await User.findOneAndUpdate(
			{ _id: user?.id },
			{ investor_pj: investor._id },
			{ new: true }
		);

		const token = generateToken(updatedUser);

		setCookie(res, "livn_auth", token);

		res.status(201).json({ data: investor });
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
