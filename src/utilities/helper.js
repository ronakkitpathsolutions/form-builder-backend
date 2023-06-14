import crypto from 'crypto'

class Helper {
	allFieldsAreRequired = (data = [], isNested = false) => {
		if (isNested) return null
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
		console.log('bytes', bytes)
		return bytes.reduce((acc, byte) => `${acc}${charset[byte & MASK]}`, '')
	}
}

export default new Helper()
