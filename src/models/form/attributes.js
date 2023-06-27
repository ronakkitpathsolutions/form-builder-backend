import mongoose, { Schema } from 'mongoose'

const attributeSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	form_code: {
		type: String,
		required: true,
		trim: true
	},
	icon: {
		type: String,
		required: true,
		trim: true
	},
	field_name: {
		type: String,
		required: true,
		trim: true
	},
	isRequired: {
		type: Boolean,
		required: false,
		default: false
	},
	type: {
		type: String,
		required: true,
		trim: true
	},
	label: {
		type: String,
		trim: true,
		default: null
	},
	placeholder: {
		type: String,
		trim: true,
		default: null
	},
	regex: {
		type: String,
		trim: true,
		default: null
	},
	description: {
		type: String,
		trim: true,
		default: null
	},
	error: {
		type: String,
		trim: true,
		default: null
	}
})

export default mongoose.model('Attributes', attributeSchema)
