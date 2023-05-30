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
}

export default new Helper()
