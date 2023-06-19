import mongoose, { Schema } from "mongoose";

const InvestmentSchema = new Schema(
	{
		date: {
			type: Date,
		},
		shares: {
			type: Number,
		},
		amount: {
			type: Number,
		},
		investor_address: {
			type: String,
		},
		investment_address: {
			type: String,
		},
		transaction_hash: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Investment ||
	mongoose.model("Investment", InvestmentSchema);
