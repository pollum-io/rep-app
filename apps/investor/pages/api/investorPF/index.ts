import { NextApiRequest, NextApiResponse } from "next/types";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import InvestorPF from "../../../models/investor-pf";
import User from "../../../models/user";
import { generateToken, setCookie, verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";

interface NextConnectApiRequest extends NextApiRequest {
	user?: {
		id: string;
		investor_pf: string;
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
	full_name: z.string(),
	birthday_date: z.string().datetime({ offset: true }),
	cpf: z.string().min(11).max(11),
	email: z.optional(z.string()),
	phone_number: z.optional(z.string()),
	city_of_birth: z.optional(z.string()),
	rg: z.optional(z.string()),
	profession: z.optional(z.string()),
	address: z.optional(z.object({} as { [key: string]: z.ZodTypeAny })),
	marital_status: z.optional(z.object({} as { [key: string]: z.ZodTypeAny })),
	is_legal_entity: z.optional(z.boolean()),
	invited_by: z.string(),
	cnh: z.optional(z.string()),
	opportunities_avaliable: z.optional(z.array(z.string())),
});

router.post(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const investorData = req.body;
		const user = req?.user;

		insertSchema.parse(investorData);

		const investorExists = await InvestorPF.findOne({ cpf: investorData.cpf });

		if (investorExists) {
			return res.status(400).json({
				error: "CPF already registered",
			});
		}

		const investor = await InvestorPF.create(investorData);

		const updatedUser = await User.findOneAndUpdate(
			{ _id: user?.id },
			{ investor_pf: investor._id },
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
