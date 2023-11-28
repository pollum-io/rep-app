import mongoose from "mongoose";

/* InvestorSchema will correspond to a collection in your MongoDB database. */
const InvestorPJSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: true,
			maxlength: 60,
		},
		cnpj: {
			type: String,
			required: true,
			maxlength: 14,
		},
		uf: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		contact_number: {
			type: String,
		},
		address: {
			type: Object,
		},
		legal_representatives: {
			type: Array,
		},
		partners: {
			type: Array,
		},
		invited_by: {
			type: String,
			required: true,
		},
		isPerfilCompleted: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.InvestorPJ ||
	mongoose.model("InvestorPJ", InvestorPJSchema);
