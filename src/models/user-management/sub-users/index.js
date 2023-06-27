import mongoose, { Schema } from 'mongoose'

const subUserSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	role: {
		type: String,
		trim: true,
		default: null
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8
	}
})

export default mongoose.model('SubUsers', subUserSchema)
