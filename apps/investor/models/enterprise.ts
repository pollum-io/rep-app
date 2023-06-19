import mongoose from "mongoose";

/* EnterpriseSchema will correspond to a collection in your MongoDB database. */
const EnterpriseSchema = new mongoose.Schema(
	{
		enterprise_name: {
			type: String,
			required: true,
			maxlength: 60,
		},
		enterprise_logo: {
			type: String,
		},
		enterprise_banner: {
			type: String,
		},
		cnpj: {
			type: String,
			required: true,
			maxlength: 14,
		},
		site_url: {
			type: String,
			maxlength: 40,
		},
		email: {
			type: String,
		},
		contact_number: {
			type: String,
		},
		social_media: {
			type: Object,
		},
		description: {
			type: String,
		},
		address: {
			type: Object,
		},
		team: {
			type: Array,
		},
		enterprise_info: {
			type: Object,
		},
		kyc_approved: {
			type: Boolean,
		},
		aum: {
			type: Number,
		},
		wallet_address: {
			type: String,
		},
		investments: {
			type: Array,
		},
		invited_by: {
			type: String,
			required: true,
		},
		uf: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Enterprise ||
	mongoose.model("Enterprise", EnterpriseSchema);
