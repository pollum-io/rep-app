import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import mongoose from "mongoose";

import { ApiResponse } from "../../../models/ApiResponse";

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res
			.status(501)
			.json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

router.get(async (req, res) => {
	const { connection } = await mongoose.connect(
		process.env.MONGODB_URI as string
	);

	const filename = req.query.filename as string;

	const gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
		bucketName: "files",
	});

	const stream = gridfsBucket.openDownloadStreamByName(filename);
	const file = await gridfsBucket.find({ filename }).toArray();

	if (!file.length) {
		res.status(404).json({ error: "File not found" });
		return;
	}

	res.setHeader("Content-type", file[0].contentType as string);
	res.setHeader("Cache-Control", "max-age=31536000, must-revalidate");

	return stream.pipe(res);
});

export default router;
