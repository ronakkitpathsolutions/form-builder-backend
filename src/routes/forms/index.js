import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import FormController from '../../controllers/form/index.js'

const formRouter = Router()

// admin purpose
formRouter.get(
	'/admin/forms',
	[Middleware.authentication, Middleware.isAdmin],
	FormController.getAllForms
)

formRouter.get(
	'/admin/forms/:form_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	FormController.getFormById
)

// for user
formRouter.post(
	'/user/:_id/forms/create',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.createForm
)

formRouter.get(
	'/user/:_id/forms',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.getFormsForUser
)

formRouter.get(
	'/user/:_id/forms/:form_id',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.getFormById
)

export default formRouter
