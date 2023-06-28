import dotenv from 'dotenv'
import {
	response,
	serverError,
	types
} from '../../../utilities/response/response.js'
import { statusCode } from '../../../utilities/response/status.js'
import Helper from '../../../utilities/helper.js'
import Access from '../../../models/user-management/access/index.js'

class AccessController {
	constructor() {
		dotenv.config()
	}

	getAllAccess = async (req, res) => {
		try {
			const data = await Access.find({}).select(['_id', 'role_type', 'access'])
			if (!data) {
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)
			}
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

	getAccess = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Access.findById(_id).select([
				'_id',
				'role_type',
				'access'
			])

			if (!data) {
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)
			}

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

	createAccess = async (req, res) => {
		try {
			const { role_type, access } = req.body
			const isAllFieldRequired = Helper.allFieldsAreRequired([
				role_type,
				access
			])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const existAccess = await Access.findOne({ role_type })
			if (!!existAccess)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'Config already exist.'
					})
				)

			const data = new Access({
				role_type,
				access: [...access].map((value) => ({
					...value,
					module_id: Helper.uniqueId(5)
				}))
			})

			const accessData = await data.save()
			return res.status(statusCode.created).json(
				response({
					type: types.success,
					data: accessData
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	updateAccess = async (req, res) => {
		try {
			const { _id } = req.params
			const isAllFieldRequired = Helper.allFieldsAreRequired(
				Object.values(req.body)
			)

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			await Access.findByIdAndUpdate(
				_id,
				Helper.removeField(['_id', 'role_type'], { ...req.body })
			)
			const data = await Access.findById(_id)

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
					message: 'Access updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	removeAccess = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Access.findByIdAndDelete(_id)

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

export default new AccessController()
