import dotenv from 'dotenv'
import {
	response,
	serverError,
	types
} from '../../../utilities/response/response.js'
import { statusCode } from '../../../utilities/response/status.js'
import Helper from '../../../utilities/helper.js'
import Roles from '../../../models/user-management/roles/index.js'

class UserRolesController {
	constructor() {
		dotenv.config()
	}

	createRole = async (req, res) => {
		try {
			const { name, value, description } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([name, value])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const existRole = await Roles.findOne({ value })
			if (!!existRole)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'Role already exist.'
					})
				)

			const data = new Roles({
				name,
				value,
				description
			})
			const roleData = await data.save()
			return res.status(statusCode.created).json(
				response({
					type: types.success,
					data: roleData
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	updateRole = async (req, res) => {
		try {
			const { body, params } = req

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

			await Roles.findByIdAndUpdate(
				params?._id,
				Helper.removeField(['value', '_id'], { ...body })
			)

			const data = await Roles.findById(params?._id)
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
					message: 'Role updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	deleteRole = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Roles.findByIdAndDelete(_id)

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

	getAllRoles = async (req, res) => {
		try {
			const data = await Roles.find({})
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

	getRole = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Roles.findById(_id)
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
}

export default new UserRolesController()
