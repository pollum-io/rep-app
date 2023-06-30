import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import nextConnect from "next-connect";

import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { generateToken, setCookie } from "../../../lib/auth";
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

router.post(async (req, res) => {
	try {
		await dbConnect();

		const { email, password } = req.body;

		authSchema.parse(req.body);

		const user = await User.findOne({ email }).lean();

		const hash = Buffer.from(
			crypto.hkdfSync("sha512", password, "livnapp", "", 64)
		).toString("base64");

		if (!user || user.password !== hash) {
			return res.status(400).json({ error: "incorrect email/password" });
		}

		delete user.password;

		const token = generateToken(user);

		const data = { user, token };

		setCookie(res, "livn_auth", token);

		if (!user?.investor_pf) {
			data.user.investor_pf = null;
		}

		if (!user?.investor_pj) {
			data.user.investor_pj = null;
		}

		res.status(200).json({ data });
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
