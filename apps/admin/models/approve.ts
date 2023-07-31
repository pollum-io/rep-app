import mongoose from "mongoose";

const ApproveSchema = new mongoose.Schema(
	{
		// address to which the token will be minted
		investor_address: {
			type: String,
		},
		// address of the opportunity to mint the token
		opportunity_address: {
			type: String,
		},
		// the amount the investor allowed to be used for the mint
		amount: {
			type: String,
		},
		// TODO: we can use this value to improve performance for analytics
		investor_pf: {
			type: mongoose.Schema.Types.ObjectId,
		},
		// TODO: we can use this value to improve performance for analytics
		opportunity_id: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Approve ||
	mongoose.model("Approve", ApproveSchema);
