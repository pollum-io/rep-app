import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		// uf: {
		// 	type: String,
		// },
		// is_legal_entity: {
		// 	type: Boolean,
		// },
		investor_pf: {
			type: mongoose.Schema.Types.ObjectId,
		},
		investor_pj: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
