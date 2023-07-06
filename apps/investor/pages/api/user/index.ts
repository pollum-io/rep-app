import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

import dbConnect from "../../../lib/dbConnect";
import { ApiResponse } from "../../../models/ApiResponse";
import User from "../../../models/user";

const UserSchema = z.object({
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

		UserSchema.parse(req.body);

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				error: "email is already in use",
			});
		}

		const hash = Buffer.from(
			crypto.hkdfSync("sha512", password, "livnapp", "", 64)
		).toString("base64");

		const newUser = await User.create({ email, password: hash });

		delete newUser._doc.password;

		res.status(201).json({ data: newUser });
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
