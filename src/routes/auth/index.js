import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import AuthController from '../../controllers/user/index.js'

const authRouter = Router()

authRouter.post(
	'/user/create',
	[Middleware.authentication, Middleware.isAdmin],
	AuthController.createUser
)
authRouter.post('/user/login', AuthController.loginUser)
authRouter.get(
	'/users',
	[Middleware.authentication, Middleware.isAdmin],
	AuthController.getAllUsers
)
authRouter.get(
	'/users/:_id',
	[Middleware.isValidObjectId, Middleware.authentication, Middleware.isAdmin],
	AuthController.getUserById
)

export default authRouter
