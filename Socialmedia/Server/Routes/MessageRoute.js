import express from 'express'
import { addMesssage, getMessages } from '../Controllers/MessageController.js'

const router = express.Router()

router.post('/', addMesssage)
router.get('/:chatId', getMessages)

export default router 