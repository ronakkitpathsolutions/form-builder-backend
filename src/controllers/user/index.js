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
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new AuthController()
