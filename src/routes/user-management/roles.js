import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import UserRolesController from '../../controllers/user-management/roles/index.js'

const userRolesRoute = Router()

userRolesRoute.post(
	'/admin/roles/create',
	[Middleware.authentication, Middleware.isAdmin],
	UserRolesController.createRole
)

userRolesRoute.get(
	'/admin/roles',
	[Middleware.authentication, Middleware.isAdmin],
	UserRolesController.getAllRoles
)

userRolesRoute.get(
	'/admin/roles/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	UserRolesController.getRole
)

userRolesRoute.patch(
	'/admin/roles/update/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	UserRolesController.updateRole
)
userRolesRoute.delete(
	'/admin/roles/delete/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	UserRolesController.deleteRole
)

export default userRolesRoute
