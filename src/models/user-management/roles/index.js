import mongoose, { Schema } from 'mongoose'

const rolesSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	value: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: false
	}
})

export default mongoose.model('Roles', rolesSchema)
