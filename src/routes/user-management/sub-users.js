import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import SubUserController from '../../controllers/user-management/sub-users/index.js'

const subUserRoute = Router()

subUserRoute.post(
	'/admin/sub-user/create',
	[Middleware.authentication, Middleware.isAdmin],
	SubUserController.createSubUser
)

subUserRoute.get(
	'/admin/sub-users',
	[Middleware.authentication, Middleware.isAdmin],
	SubUserController.getAllSubUsers
)

subUserRoute.get(
	'/admin/sub-users/:_id',
	[
		Middleware.authentication,
		Middleware.bothAreAccessible,
		Middleware.isValidObjectId
	],
	SubUserController.getSubUser
)

subUserRoute.patch(
	'/admin/sub-users/update/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	SubUserController.updateUser
)

subUserRoute.delete(
	'/admin/sub-users/delete/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	SubUserController.deleteUser
)

export default subUserRoute
