import mongoose, { Schema } from 'mongoose'

const AccessItem = [
	{
		module_id: {
			type: String,
			required: true,
			trim: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		value: {
			type: String,
			default: 'HIDE',
			trim: true
		}
	}
]

const accessSchema = new Schema({
	created_At: {
		type: Date,
		default: Date.now
	},
	role_type: {
		type: String,
		trim: true,
		required: true
	},
	access: AccessItem
})

export default mongoose.model('Access', accessSchema)
