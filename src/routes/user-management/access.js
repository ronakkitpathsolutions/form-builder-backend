import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import AccessController from '../../controllers/user-management/access/index.js'

const accessRoute = Router()

accessRoute.post(
	'/admin/access/create',
	[Middleware.authentication, Middleware.isAdmin],
	AccessController.createAccess
)

accessRoute.delete(
	'/admin/access/delete/:_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	AccessController.removeAccess
)

export default accessRoute
