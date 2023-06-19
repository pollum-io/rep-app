import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import { ApiResponse } from "../../../models/ApiResponse";
import Approve from "../../../models/approve";

const ApproveSchema = z.object({
	investor_address: z.string(),
	opportunity_address: z.string(),
	amount: z.string(),
});

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

router.post(async (req, res) => {
	try {
		await dbConnect();

		const { investor_address, opportunity_address, amount } = req.body;

		ApproveSchema.parse(req.body);

		const approve = await Approve.create({
			investor_address,
			opportunity_address,
			amount,
		});

		res.status(201).json({ data: approve });
	} catch (error: any) {
		res.status(400).json({
			error: !/^[\[|\{](\s|.*|\w)*[\]|\}]$/.test(error.message)
				? error.message
				: JSON.parse(error.message),
		});
	}
});

export default router;
