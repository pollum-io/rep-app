import mongoose from "mongoose";

/* InvestorSchema will correspond to a collection in your MongoDB database. */
const InvestorPFSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
		},
		birthday_date: {
			type: String,
		},
		cpf: {
			type: String,
		},
		email: {
			type: String,
		},
		phone_number: {
			type: String,
		},
		city_of_birth: {
			type: String,
		},
		rg: {
			type: String,
		},
		profession: {
			type: String,
		},
		address: {
			type: Object,
		},
		marital_status: {
			type: Object,
		},
		is_legal_entity: {
			type: Boolean,
		},
		invited_by: {
			type: String,
		},

		// comentar depois, por hora vai estar todas oportunidades disponiveis
		opportunities_avaliable: {
			type: mongoose.Schema.Types.ObjectId,
		},
		// mother_name: {
		// 	type: String,
		// },
		// cnh: {
		// 	type: String,
		// },

		// cnpj: {
		// 	type: String,
		// },
		// uf: {
		// 	type: String,
		// },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.InvestorPF ||
	mongoose.model("InvestorPF", InvestorPFSchema);
