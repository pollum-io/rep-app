import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import nextConnect from "next-connect";

import { clearUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";

const authSchema = z.object({
	email: z.string(),
	password: z.string(),
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

router.get(async (req, res) => {
	try {
		clearUser(res);

		res.status(200).end();
	} catch (error: any) {
		res.status(400).json({
			error: !/^[\[|\{](\s|.*|\w)*[\]|\}]$/.test(error.message)
				? error.message
				: JSON.parse(error.message),
		});
	}
});

export default router;
