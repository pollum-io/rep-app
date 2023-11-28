import { NextApiRequest, NextApiResponse } from "next/types";

import dbConnect from "../../../lib/dbConnect";
import InvestorSchema from "../../../models/investor-pj";
import { verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";
import nextConnect from "next-connect";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

router.get(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;
		const { user } = req;

		const investor = await InvestorSchema.findById(id);

		if (!investor || user?.investor_pj !== `${investor._id}`) {
			return res
				.status(200)
				.json({ data: null, message: "investor not found" });
		}

		res.status(200).json({ data: investor });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		}
	}
});

router.put(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;

		const investor = await InvestorSchema.findOneAndUpdate(
			{ _id: id },
			req.body,
			{
				new: true,
				runValidators: true,
				isPerfilCompleted: true,
			}
		);

		if (!investor) {
			return res.status(204).end("no investor data to udpate");
		}

		res.status(201).json({ data: investor });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		}
	}
});

router.delete(verifyUser, async (req, res) => {
	try {
		await dbConnect();

		const { id } = req.query;

		const deletedInvestor = await InvestorSchema.deleteOne({ _id: id });

		if (!deletedInvestor) {
			return res.status(202).end("no investor data to delete");
		}

		res.status(204).end();
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error?.message });
		}
	}
});

export default router;
