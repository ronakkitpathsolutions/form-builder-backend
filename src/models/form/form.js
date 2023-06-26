import mongoose, { Schema } from 'mongoose'

const formSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	user_id: {
		type: String,
		required: true,
		trim: true
	},
	form_code: {
		type: String,
		required: true,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: false,
		trim: true,
		default: ''
	}
})

export default mongoose.model('Forms', formSchema)
