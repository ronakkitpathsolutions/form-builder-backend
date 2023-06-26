import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import FieldController from '../../controllers/fields/index.js'

const fieldsRouter = Router()

fieldsRouter.post(
	'/field/create',
	[Middleware.authentication, Middleware.isAdmin],
	FieldController.createInputField
)

fieldsRouter.get('/field', FieldController.getAllFields)

fieldsRouter.get('/field/:_id', FieldController.getField)

fieldsRouter.patch(
	'/field/update/:_id',
	[Middleware.authentication, Middleware.isValidObjectId, Middleware.isAdmin],
	FieldController.updateField
)

fieldsRouter.delete(
	'/field/delete/:_id',
	[Middleware.authentication, Middleware.isValidObjectId, Middleware.isAdmin],
	FieldController.deleteField
)

export default fieldsRouter
