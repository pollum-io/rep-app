import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import nextConnect from "next-connect";

import dbConnect from "../../../lib/dbConnect";
import Investment from "../../../models/Investment";
import { verifyUser } from "../../../lib/auth";
import { ApiResponse } from "../../../models/ApiResponse";
import Investor from "../../../models/investor-pf";
import Opportunity from "../../../models/oportunity";

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

		const { investorId } = req.query;
		const page = +req.query.page ? +req.query.page - 1 : 0;
		const limit = +req.query.limit || 100;
		const { user } = req;

		if (!isValidObjectId(investorId)) {
			return res.status(400).json({ error: "invalid id" });
		}

		const investor = await Investor.findById(investorId).lean();

		if (!investor || user?.investor_pf !== `${investor._id}`) {
			return res.status(200).json({ data: [], message: "investor not found" });
		}

		const { wallet_address } = investor;

		const totalPages = Math.ceil(
			(await Investment.countDocuments({
				investor_address: wallet_address,
			})) / limit
		);

		let investments = await Investment.find({
			investor_address: wallet_address,
		})
			.limit(limit)
			.skip(page * limit)
			.sort({ createdAt: -1 })
			.lean();

		const addresses = investments.map(
			({ investment_address }) => investment_address
		);

		const opportunities = await Opportunity.find({
			token_address: { $in: addresses },
		}).lean();

		investments = investments.map((investment) => {
			const opportunity = opportunities.find(
				({ token_address }) => token_address === investment?.investment_address
			);

			return {
				...investment,
				name: opportunity?.name || "",
				enterprise_type: opportunity?.enterprise_type || "",
				expected_delivery_date: opportunity?.expected_delivery_date || "",
				profitability: opportunity?.profitability || "",
				address: opportunity?.address || {},
				pictures_enterprise: opportunity?.pictures_enterprise || {},
			};
		});

		res.status(200).json({ data: investments, totalPages });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		}
	}
});

export default router;
