const types = {
	success: 'success',
	error: 'error'
}

const response = ({ type, error, data, message }) => {
	const object = {
		type,
		error,
		data,
		message
	}
	if (!error) delete object[error]
	if (!data) delete object[data]
	if (!message) delete object[message]
	return object
}

export { types, response }
