import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import http from 'http'
import loadExtensions from './src/utilities/load-extensions.js'
import database from './src/db/config.js'

class App {
	constructor() {
		dotenv.config()
		loadExtensions
			.loadExtension()
			.then(() => express())
			.then((app) => this.dbConfiguration(app))
			.then((app) => {
				console.log('1. server configuration completed.')
				return this.configureServer(app)
			})
			.then((app) => {
				console.log('2. server starting.')
				return this.startServer(app)
			})
	}

	// eslint-disable-next-line class-methods-use-this
	configureServer = () =>
		new Promise((resolve) => {
			const app = express()
			app.use(cors())
			app.use(express.json({ limit: '10mb' }))
			app.use(express.urlencoded({ extended: true }))
			app.use(bodyParser.urlencoded({ extended: false }))
			app.use('/api/v1', async (req, res) =>
				res.json({
					type: 'success',
					message: 'server started.',
				})
			)
			resolve(app)
		})

	startServer = (app) =>
		new Promise((resolve) => {
			const port = process.env.PORT || 4000
			app.set(port)
			const server = http.createServer(app)
			server.on('listening', () => {
				const PORT = server.address().port
				console.log('3. server started on:', `http://localhost:${PORT}/api/v1`)
				resolve(server)
			})
			server.listen(port)
		})

	dbConfiguration = (app) =>
		new Promise((resolve) => {
			database
				.connection()
				.then(() => {
					console.log('db connected.')
				})
				.catch((error) => console.log('error', error))

			resolve(app)
		})
}

export default new App()
