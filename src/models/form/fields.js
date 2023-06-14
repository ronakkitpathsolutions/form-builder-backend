import mongoose, { Schema } from 'mongoose'

const fieldSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	field_code: {
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
	field_description: {
		type: String,
		required: true,
		trim: true
	},
	field_type: {
		type: String,
		required: true,
		trim: true
	}
})

export default mongoose.model('Fields', fieldSchema)
