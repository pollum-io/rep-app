import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ApiResponse } from "../../../models/ApiResponse";
import uploadFile from "../../../lib/uploadFile";
import { verifyUser } from "../../../lib/auth";

interface NextConnectApiRequest extends NextApiRequest {
	files: Express.Multer.File[];
	user?: string;
}

type ResponseData = ApiResponse<string>;

const router = nextConnect({
	onError(
		error,
		req: NextConnectApiRequest,
		res: NextApiResponse<ResponseData>
	) {
		res.status(501).json({ error: `something went wrong! ${error.message}` });
	},
	onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

router.use(verifyUser).use(uploadFile.array("files"));

router.post((req, res) => {
	const files = req.files.map(file => file.filename);

	res.status(200).json({ data: files });
});

export const config = { api: { bodyParser: false } }; // Disallow body parsing, consume as stream

export default router;
