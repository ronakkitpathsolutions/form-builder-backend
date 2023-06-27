import dotenv from 'dotenv'
import { statusCode } from '../../utilities/response/status.js'
import Helper from '../../utilities/helper.js'
import {
	response,
	serverError,
	types
} from '../../utilities/response/response.js'
import Attributes from '../../models/form/attributes.js'

class AttributesController {
	constructor() {
		dotenv.config()
	}

	addField = async (req, res) => {
		try {
			const { form_code, icon, type, field_name, ...body } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([
				form_code,
				icon,
				type,
				field_name,
				...Object.values(body)
			])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const data = await Attributes({
				form_code,
				icon,
				type,
				field_name,
				...body
			})

			const attributesData = await data.save()

			return res.status(statusCode.created).json(
				response({
					type: types.success,
					message: 'New Field added successfully.',
					data: attributesData
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

			await Attributes.findByIdAndUpdate(
				params?.attr_id,
				Helper.removeField(['form_code', 'icon', 'type', 'field_name'], {
					...body
				})
			)
			const data = await Attributes.findById(params?.attr_id)

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
					message: 'Attribute updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getFields = async (req, res) => {
		try {
			const { form_code } = req.params
			const data = await Attributes.find({ form_code })
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

	deleteField = async (req, res) => {
		try {
			const { attr_id } = req.params
			const data = await Attributes.findByIdAndDelete(attr_id)
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

export default new AttributesController()
