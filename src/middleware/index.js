import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { statusCode } from '../utilities/response/status.js'
import { response, serverError, types } from '../utilities/response/response.js'
import JWT from '../utilities/jwt.js'
import User from '../models/user/user.js'

class MiddleWare {
	constructor() {
		dotenv.config()
	}

	isValidObjectId = (req, res, next) => {
		const { _id, form_id } = req.params
		if (Types.ObjectId.isValid(_id || form_id)) next()
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
			serverError(error, res)
		}
	}

	isAdmin = async (req, res, next) => {
		try {
			const { token } = req.headers
			const isAdmin = await JWT.handleAccess(token)

			if (!isAdmin)
				res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Unauthorized user.'
					})
				)
			else next()
		} catch (error) {
			serverError(error, res)
		}
	}

	onlyForUser = async (req, res, next) => {
		try {
			const { token } = req.headers
			const isUser = await JWT.handleAccess(token, true)

			if (!isUser)
				res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Unauthorized user.'
					})
				)
			else next()
		} catch (error) {
			serverError(error, res)
		}
	}

	bothAreAccessible = async (req, res, next) => {
		try {
			const { token } = req.headers
			const { _id } = req.params

			const verifiedUser = await JWT.verifyUserToken(token)
			const findUser = await User.findById(verifiedUser?.user_id)

			if (verifiedUser?.role !== 'admin' && findUser?._id?.toString() !== _id)
				res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Unauthorized user.'
					})
				)
			else return next()
		} catch (error) {
			serverError(error, res)
		}
	}

	getAccessByUserId = async (req, res, next) => {
		try {
			const { token } = req.headers
			const { _id } = req.params

			const verifiedUser = await JWT.verifyUserToken(token)
			const findUser = await User.findById(verifiedUser?.user_id)

			if (findUser?._id?.toString() !== _id)
				res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Unauthorized user.'
					})
				)
			else return next()
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new MiddleWare()
