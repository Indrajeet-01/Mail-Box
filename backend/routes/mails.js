import express from 'express'
import { createAndSendEmail,deleteEmail,getEmailById,inbox,markAsRead,sentbox } from '../controllers/mails.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/create-send', authMiddleware, createAndSendEmail)
router.get('/inbox', authMiddleware, inbox)
router.get('/sentbox', authMiddleware, sentbox)
router.get('/:emailId', authMiddleware, getEmailById)
router.delete('/delete/:emailId', authMiddleware, deleteEmail)
router.put('/read/:emailId', authMiddleware, markAsRead)
export default router