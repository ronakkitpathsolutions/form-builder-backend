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
				field_description,
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
			console.log('existField', existField)
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
}

export default new FieldController()
