import { Router } from 'express'
import Middleware from '../../middleware/index.js'
import FieldController from '../../controllers/fields/index.js'

const fieldsRouter = Router()

fieldsRouter.post(
	'/field/create',
	[Middleware.authentication, Middleware.isAdmin],
	FieldController.createInputField
)

export default fieldsRouter
