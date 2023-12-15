import express from 'express'
import { createAndSendEmail,getEmailById,inbox,sentbox } from '../controllers/mails.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/create-send', authMiddleware, createAndSendEmail)
router.get('/inbox', authMiddleware, inbox)
router.get('/sentbox', authMiddleware, sentbox)
router.get('/:emailId', authMiddleware, getEmailById)
  
export default router