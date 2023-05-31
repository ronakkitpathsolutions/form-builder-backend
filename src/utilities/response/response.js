import { statusCode } from './status.js'

const types = {
	success: 'success',
	error: 'error'
}

const response = ({ type, error, data, message, ...fields }) => {
	const object = {
		type,
		error,
		data,
		message
	}
	if (!error || !!data) delete object[error]
	if (!data || !!error) delete object[data]
	if (!message) delete object[message]
	return { ...object, ...fields }
}

const serverError = (error, res) =>
	res.status(statusCode.serverError).json(
		response({
			type: types.error,
			message: error?.message || 'Somthing went wrong'
		})
	)

export { types, response, serverError }
