import {Router} from 'express'
import { getChat, getGroupMessages, sendGroupMessages, sendMessage } from '../controllers/chatControllers.js'


const router = Router()
router.get("/chat/:userId",getChat as any)
router.post('/chat/:userId',sendMessage)
router.get("/groupChat/:groupId",getGroupMessages)
router.post("/groupChat/:groupId",sendGroupMessages)



export default router