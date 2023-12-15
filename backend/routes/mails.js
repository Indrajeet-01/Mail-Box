import express from 'express'
import { createAndSendEmail } from '../controllers/mails.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/create-send',authMiddleware,createAndSendEmail)

export default router