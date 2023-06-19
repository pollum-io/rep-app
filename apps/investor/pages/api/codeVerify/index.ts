import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import RecoverPassword from "../../../models/recoverPassword";
import { ApiResponse } from "../../../models/ApiResponse";

type ResponseData = ApiResponse<boolean | string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const RecoverPasswordSchema = z.object({
	code: z.string().max(60),
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();

		const { code } = req.query;

		const validatedData = RecoverPasswordSchema.parse({
			code: code as string,
		});

		const recoverPassword = await RecoverPassword.findOne({
			code: validatedData.code,
		});

		if (
			recoverPassword &&
			Date.now() < new Date(recoverPassword.expirationDate).getTime()
		) {
			return res.status(200).json({ isValid: true });
		}

		return res.status(200).json({ isValid: false });
	} catch (error) {
		return res.status(501).json({ error: `Something went wrong! ${error}` });
	}
});

export default router;
