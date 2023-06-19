import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import crypto from "crypto";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { ApiResponse } from "../../../models/ApiResponse";
import RecoverPassword from "../../../models/recoverPassword";

type ResponseData = ApiResponse<boolean | string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const ChangePasswordSchema = z.object({
	code: z.string().max(60),
	password: z.string().min(6),
});

router.put(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
	try {
		await dbConnect();

		const { code, password } = req.body;

		const validatedData = ChangePasswordSchema.parse({
			code: code as string,
			password,
		});

		const recoverPassword = await RecoverPassword.findOne({
			code: validatedData.code,
		});

		const hash = Buffer.from(
			crypto.hkdfSync("sha512", password, "livnapp", "", 64)
		).toString("base64");

		if (
			recoverPassword &&
			Date.now() < new Date(recoverPassword.expirationDate).getTime()
		) {
			await User.updateOne(
				{ email: recoverPassword.email },
				{ password: hash }
			);
			return res.status(200).end();
		}

		return res.status(401).end();
	} catch (error) {
		return res.status(501).json({ error: `Something went wrong! ${error}` });
	}
});

export default router;
