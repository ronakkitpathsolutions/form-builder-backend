import dotenv from 'dotenv'
import { statusCode } from '../../utilities/response/status.js'
import {
	response,
	serverError,
	types
} from '../../utilities/response/response.js'
import User from '../../models/user/user.js'

class UserController {
	constructor() {
		dotenv.config()
	}

	getUserById = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await User.findById(_id).select([
				'username',
				'email',
				'role',
				'contact',
				'created_At'
			])
			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'User not found.'
					})
				)
			res.status(statusCode.success).json(
				response({
					type: types.success,
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getAllUsers = async (req, res) => {
		try {
			const data = await User.find({}).select([
				'username',
				'email',
				'role',
				'contact',
				'created_At'
			])
			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Users not found.'
					})
				)
			res.status(statusCode.success).json(
				response({
					type: types.success,
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new UserController()
