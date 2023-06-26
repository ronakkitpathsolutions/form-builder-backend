import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import FormController from '../../controllers/form/index.js'

const formRouter = Router()

// admin and user both are access this route

formRouter.post(
	'/user/:_id/forms/create',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.createForm
)

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

formRouter.delete(
	'/admin/forms/delete/:form_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	FormController.deleteForm
)

formRouter.patch(
	'/admin/forms/update/:form_id',
	[Middleware.authentication, Middleware.isAdmin, Middleware.isValidObjectId],
	FormController.updateForm
)

// for user

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

formRouter.patch(
	'/user/:_id/forms/update/:form_id',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.updateForm
)

formRouter.delete(
	'/user/:_id/forms/delete/:form_id',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	FormController.deleteForm
)

export default formRouter
