import dotenv from 'dotenv'
import { statusCode } from '../../utilities/response/status.js'
import {
	response,
	serverError,
	types
} from '../../utilities/response/response.js'
import Helper from '../../utilities/helper.js'
import Form from '../../models/form/form.js'

class FormController {
	constructor() {
		dotenv.config()
	}

	createForm = async (req, res) => {
		try {
			const { _id } = req.params
			const { title, description } = req.body

			const isAllFieldRequired = Helper.allFieldsAreRequired([
				title,
				description
			])

			if (isAllFieldRequired)
				return res.status(statusCode.badRequest).json(
					response({
						type: types.error,
						message: 'All fields are required.'
					})
				)

			const data = await Form({
				title,
				description,
				form_code: Helper.uniqueId(12),
				user_id: _id
			})

			const formData = await data.save()

			return res.status(statusCode.created).json(
				response({
					type: types.success,
					message: 'Form created successfully.',
					data: formData
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getAllForms = async (req, res) => {
		try {
			const data = await Form.find({})
			if (!data)
				return res.status(statusCode.notFound).json(
					response({
						type: types.error,
						message: 'Forms not found.'
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

	getFormById = async (req, res) => {
		try {
			const { form_id } = req.params
			const data = await Form.findById(form_id)
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
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	getFormsForUser = async (req, res) => {
		try {
			const { _id } = req.params
			const data = await Form.find({ user_id: _id })
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
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}

	deleteForm = async (req, res) => {
		try {
			const { form_id } = req.params
			const data = await Form.findByIdAndDelete(form_id)
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

	updateForm = async (req, res) => {
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

			await Form.findByIdAndUpdate(
				params?.form_id,
				Helper.removeField(['form_code', 'user_id'], { ...body })
			)
			const data = await Form.findById(params?.form_id)

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
					message: 'Form updated successfully.',
					data
				})
			)
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new FormController()
