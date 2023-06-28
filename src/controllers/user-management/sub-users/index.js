import dotenv from 'dotenv'
import {
	response,
	serverError,
	types
} from '../../../utilities/response/response.js'
import SubUsers from '../../../models/user-management/sub-users/index.js'
import { statusCode } from '../../../utilities/response/status.js'
import Helper from '../../../utilities/helper.js'
import Bcrypt from '../../../utilities/bcrypt.js'
import JWT from '../../../utilities/jwt.js'

class SubUserController {
	constructor() {
		dotenv.config()
	}

	createSubUser = async (req, res) => {
		try {
			const { name, email, password, confirm_password, ...body } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([
				name,
				email,
				password,
				confirm_password
			])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			if (password !== confirm_password)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'password and confirm password does not matched.'
					})
				)

			const existUser = await SubUsers.findOne({ email })
			if (!!existUser)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'Email already exist.'
					})
				)

			const data = new SubUsers({
				name,
				email,
				password: await Bcrypt.hashPassword(password),
				...body
			})
			const userData = await data.save()

			return res.status(statusCode.created).json(
				response({
					type: types.success,
					message: 'User register successfully.',
					token: await JWT.generateNewToken({
						user_id: userData?._id,
						email: userData?.email,
						role: userData?.role,
						username: userData?.name
					})
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getAllSubUsers = async (req, res) => {
		try {
			const data = await SubUsers.find({}).select([
				'_id',
				'name',
				'email',
				'role'
			])
			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)

			return res.status(statusCode.success).json(
				response({
					type: types.success,
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getSubUser = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await SubUsers.findById(_id).select([
				'_id',
				'name',
				'email',
				'role'
			])

			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)

			return res.status(statusCode.success).json(
				response({
					type: types.success,
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	updateUser = async (req, res) => {
		try {
			const { _id } = req.params
			const { ...body } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired(
				Object.values(body)
			)

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			await SubUsers.findByIdAndUpdate(_id, { ...body })

			const data = await SubUsers.findById(_id).select([
				'_id',
				'name',
				'email',
				'role'
			])
			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)

			return res.status(statusCode.success).json(
				response({
					type: types.success,
					message: 'User updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	deleteUser = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await SubUsers.findByIdAndDelete(_id)

			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)
			res.status(statusCode.success).json(
				response({
					type: types.success,
					message: 'Deleted successfully.'
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new SubUserController()
