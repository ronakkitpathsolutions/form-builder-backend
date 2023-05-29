import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

class JWT {
	constructor() {
		dotenv.config()
	}

	generateNewToken = async (payload, schedule = 60) => {
		const token = await new Promise((resolve, reject) => {
			jwt.sign(
				{ ...payload, exp: Math.floor(Date.now() / 1000) + schedule * 60 },
				process.env.SECRET_KEY,
				(err, data) => {
					if (err) reject(err)
					resolve(data)
				}
			)
		})
		return token
	}
}

export default new JWT()
