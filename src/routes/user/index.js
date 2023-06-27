import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import UserController from '../../controllers/user/index.js'

const userRouter = Router()

userRouter.get(
	'/users',
	[Middleware.authentication, Middleware.isAdmin],
	UserController.getAllUsers
)
userRouter.get(
	'/users/:_id',
	[Middleware.isValidObjectId, Middleware.authentication, Middleware.isAdmin],
	UserController.getUserById
)

export default userRouter
