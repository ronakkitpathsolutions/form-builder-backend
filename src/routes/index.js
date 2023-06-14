import { Router } from 'express'
import authrouter from './auth/index.js'
import fieldsRouter from './fields/index.js'

const router = Router()
router.use(authrouter)
router.use(fieldsRouter)

export default router
