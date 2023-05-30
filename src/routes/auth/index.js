import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import jwt from '../../utilities/jwt.js'

const authrouter = Router()

authrouter.get(
	'/check/:_id',
	[Middleware.authentication, Middleware.isValidObjectId],
	(_, res) => res.json({ type: 'check' })
)
authrouter.get('/token', async (_, res) =>
	res.json({ type: 'ok', token: await jwt.generateNewToken({ name: 'Ronak' }) })
)

export default authrouter
