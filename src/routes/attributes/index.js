import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import AttributesController from '../../controllers/attributes/index.js'

const attributesRouter = Router()

// admin and user both are access this route

attributesRouter.get(
	'/user/:_id/attributes/:form_code',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	AttributesController.getFields
)

attributesRouter.post(
	'/user/:_id/attribute/create',
	[Middleware.authentication, Middleware.getAccessByUserId],
	AttributesController.addField
)

attributesRouter.patch(
	'/user/:_id/attribute/update/:attr_id',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	AttributesController.updateField
)

attributesRouter.delete(
	'/user/:_id/attribute/delete/:attr_id',
	[
		Middleware.authentication,
		Middleware.getAccessByUserId,
		Middleware.isValidObjectId
	],
	AttributesController.deleteField
)

export default attributesRouter
