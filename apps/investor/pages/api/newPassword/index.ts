import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";
import crypto from "crypto";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { ApiResponse } from "../../../models/ApiResponse";
import { verifyUser } from "../../../lib/auth";

type ResponseData = ApiResponse<boolean | string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const NewPasswordSchema = z.object({
	oldPassword: z.string().min(6),
	newPassword: z.string().min(6),
});

router.put(verifyUser, async (req: any, res: NextApiResponse<ResponseData>) => {
	try {
		await dbConnect();

		const { oldPassword, newPassword } = req.body;

		const { id } = req.user;

		NewPasswordSchema.parse({
			oldPassword,
			newPassword,
		});

		const user = await User.findById({ _id: id });

		const hash = Buffer.from(
			crypto.hkdfSync("sha512", oldPassword, "livnapp", "", 64)
		).toString("base64");

		if (!user || user.password !== hash) {
			return res.status(400).json({ error: "Senha atual incorreta" });
		}

		const hashNewPassword = Buffer.from(
			crypto.hkdfSync("sha512", newPassword, "livnapp", "", 64)
		).toString("base64");

		await User.updateOne({ _id: id }, { password: hashNewPassword });

		return res.status(200).end();
	} catch (error) {
		return res.status(501).json({ error: `Something went wrong! ${error}` });
	}
});

export default router;
