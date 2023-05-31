import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { statusCode } from '../utilities/response/status.js'
import { response, types } from '../utilities/response/response.js'
import JWT from '../utilities/jwt.js'

class MiddleWare {
	constructor() {
		dotenv.config()
	}

	isValidObjectId = (req, res, next) => {
		const { _id } = req.params
		if (Types.ObjectId.isValid(_id)) next()
		else
			res
				.status(statusCode.unauthorized)
				.json(response({ type: types.error, message: 'Invalid objectId.' }))
	}

	authentication = async (req, res, next) => {
		try {
			const { token } = req.headers
			if (!token)
				res
					.status(statusCode.unauthorized)
					.json(response({ type: types.error, message: 'Provide token.' }))
			else if (await JWT.tokenExpired(token))
				res
					.status(statusCode.unauthorized)
					.json(response({ type: types.error, message: 'Invalid token.' }))
			else next()
		} catch (error) {
			res.status(statusCode.serverError).json(
				response({
					type: types.error,
					message: error.message || 'Somthing went wrong.'
				})
			)
		}
	}

	isAdmin = async (req, res, next) => {
		try {
			const { token } = req.headers
			const isAdmin = await JWT.handleAdminAccess(token)

			if (!isAdmin)
				res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Unauthorized user.'
					})
				)
			else next()
		} catch (error) {
			res.status(statusCode.serverError).json(
				response({
					type: types.error,
					message: error.message || 'Somthing went wrong.'
				})
			)
		}
	}
}

export default new MiddleWare()
