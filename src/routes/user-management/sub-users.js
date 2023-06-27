import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import SubUserController from '../../controllers/user-management/sub-users/index.js'

const subUserRoute = Router()

subUserRoute.post(
	'/admin/sub-user/create',
	[Middleware.authentication, Middleware.isAdmin],
	SubUserController.createSubUser
)

export default subUserRoute
