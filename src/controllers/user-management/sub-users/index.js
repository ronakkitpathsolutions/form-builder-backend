import dotenv from 'dotenv'
import { serverError } from '../../../utilities/response/response.js'

class SubUserController {
	constructor() {
		dotenv.config()
	}

	createSubUser = async (req, res) => {
		try {
			const { name, email, password, confirm_password } = req.body
			console.log('>>>', { name, email, password, confirm_password })
		} catch (error) {
			serverError(error, res)
		}
	}
}

export default new SubUserController()
