import { Router } from 'express'
import authRouter from './auth/index.js'
import fieldsRouter from './fields/index.js'
import userRouter from './user/index.js'
import formRouter from './forms/index.js'
import attributesRouter from './attributes/index.js'

const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(fieldsRouter)
router.use(formRouter)
router.use(attributesRouter)

export default router
