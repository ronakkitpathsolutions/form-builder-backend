import { Router } from 'express'

const authrouter = Router()

authrouter.get('/check', (_, res) => res.json({ type: 'check' }))
authrouter.get('/ok', (_, res) => res.json({ type: 'ok' }))

export default authrouter
