import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import AuthController from '../../controllers/user/index.js'

const authRouter = Router()

authRouter.get(
	'/check/:_id',
	[Middleware.authentication, Middleware.isValidObjectId],
	(_, res) => res.json({ type: 'check' })
)

authRouter.post(
	'/user/create',
	[Middleware.authentication, Middleware.isAdmin],
	AuthController.createUser
)
authRouter.post('/user/login', AuthController.loginUser)

export default authRouter
