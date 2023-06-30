import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { v4 as uuid } from "uuid";
import mime from "mime-types";

const storage = new GridFsStorage({
	url: process.env.MONGODB_URI as string,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (_, file) => {
		const id = uuid();
		const ext = mime.extension(file.mimetype);

		return { bucketName: "files", filename: `${id}.${ext}` };
	},
});

export default multer({
	storage,
	limits: { fileSize: 41943040 },
	preservePath: false,
});
