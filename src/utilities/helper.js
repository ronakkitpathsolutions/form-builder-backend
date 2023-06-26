import crypto from 'crypto'

class Helper {
	allFieldsAreRequired = (data = []) => {
		if (!data?.length) return true
		const cloneData = [...data]
		const validatorArray = []
		cloneData?.forEach((value) => {
			validatorArray?.push(!value)
		})
		return validatorArray?.some((fields) => !!fields)
	}

	uniqueId = (size) => {
		const MASK = 0x3d
		const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
		const NUMBERS = '1234567890'
		const charset = `${NUMBERS}${LETTERS}${LETTERS.toUpperCase()}`.split('')
		const bytes = new Uint8Array(size)
		crypto.webcrypto.getRandomValues(bytes)
		return bytes.reduce((acc, byte) => `${acc}${charset[byte & MASK]}`, '')
	}

	removeField = (fields = [], body = {}) => {
		if (!Object.keys(body)?.length) return {}
		const cloneFields = [...fields]
		const filteredResponse = { ...body }
		cloneFields.forEach((data) => {
			if (data in body) {
				delete filteredResponse[data]
			}
		})
		return filteredResponse
	}
}

export default new Helper()
