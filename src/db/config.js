import mongoose from 'mongoose'
import dotenv from 'dotenv'

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 10 * 1000 // 1s timeout
}

class Database {
	constructor() {
		dotenv.config()
	}

	connection = () =>
		new Promise((resolve) => {
			const db = mongoose.connect(process.env.MONGO_CONNECT, options)
			resolve(db)
		})
}

export default new Database()
