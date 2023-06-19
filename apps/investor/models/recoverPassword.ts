import mongoose from "mongoose";

const RecoverPasswordSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		expirationDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.RecoverPassword ||
	mongoose.model("RecoverPassword", RecoverPasswordSchema);
