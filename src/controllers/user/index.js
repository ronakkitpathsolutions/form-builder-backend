import dotenv from 'dotenv'
import { statusCode } from '../../utilities/response/status.js'
import {
	response,
	serverError,
	types
} from '../../utilities/response/response.js'
import User from '../../models/user/user.js'
import Helper from '../../utilities/helper.js'
import Bcrypt from '../../utilities/bcrypt.js'
import JWT from '../../utilities/jwt.js'

class AuthController {
	constructor() {
		dotenv.config()
	}

	createUser = async (req, res) => {
		try {
			const { username, email, contact, password, confirm_password, ...body } =
				req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([
				username,
				email,
				contact,
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

			const existUser = await User.findOne({ email })
			if (!!existUser)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'Email already exist.'
					})
				)

			const data = new User({
				username,
				email,
				contact,
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
						username: userData?.username,
						contact: userData?.contact
					})
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	loginUser = async (req, res) => {
		try {
			const { email, password } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([email, password])
			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const findUser = await User.findOne({ email })

			if (!findUser)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'User not found this email address.'
					})
				)

			const isAuthenticated = await Bcrypt.comparePassword(
				password,
				findUser?.password
			)

			if (!isAuthenticated)
				return res.status(statusCode.unauthorized).json(
					response({
						type: types.error,
						message: 'Invalid username or password.'
					})
				)

			return res.status(statusCode.success).json(
				response({
					type: types.success,
					message: 'User login successfully.',
					token: await JWT.generateNewToken({
						user_id: findUser?._id,
						email: findUser?.email,
						role: findUser?.role,
						username: findUser?.username,
						contact: findUser?.contact
					})
				})
			)
		} catch (error) {
			serverError(error, res)
		}
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

export default new AuthController()
