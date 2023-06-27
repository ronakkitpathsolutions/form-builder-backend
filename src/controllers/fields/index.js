import dotenv from 'dotenv'
import { statusCode } from '../../utilities/response/status.js'
import {
	response,
	serverError,
	types
} from '../../utilities/response/response.js'
import Helper from '../../utilities/helper.js'
import Fields from '../../models/form/fields.js'

class FieldController {
	constructor() {
		dotenv.config()
	}

	createInputField = async (req, res) => {
		try {
			const { field_description, field_name, icon, field_type } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([
				field_name,
				icon,
				field_type
			])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const existField = await Fields.findOne({ field_type })
			if (!!existField)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'Field already exist.'
					})
				)

			const data = new Fields({
				field_name,
				field_type,
				field_description,
				icon,
				field_code: Helper.uniqueId(8)
			})

			const fieldData = await data.save()

			return res.status(statusCode.created).json(
				response({
					type: types.success,
					message: 'Field created successfully.',
					data: fieldData
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getField = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Fields.findById(_id)

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

	getAllFields = async (req, res) => {
		try {
			const data = await Fields.find({})
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

	updateField = async (req, res) => {
		try {
			const { params, body } = req
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

			await Fields.findByIdAndUpdate(
				params?._id,
				Helper.removeField(['field_code', 'field_type'], { ...body })
			)
			const data = await Fields.findById(params?._id)

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
					message: 'Field updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	deleteField = async (req, res) => {
		try {
			const { _id } = req.params
			const deleteField = await Fields.findByIdAndDelete(_id)

			if (!deleteField)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Not found.'
					})
				)

			return res.status(statusCode.success).json(
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

export default new FieldController()
