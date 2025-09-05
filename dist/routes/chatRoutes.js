import { Router } from "express";
import { addUserToGroup, changeUserRole, createGroup, deleteGroup, deleteMessage, editMessage, getChat, getGroupMessages, leaveGroup, removeUserFromGroup, sendGroupMessages, sendMessage, } from "../controllers/chatControllers.js";
const router = Router();
router.get("/chat/:userId", getChat);
router.post("/chat/:userId", sendMessage);
router.delete("/chat/:messageId", deleteMessage);
router.patch("/chat/:messageId", editMessage);
router.post("/chat/group/create", createGroup);
router.post("/chat/group/:groupId", addUserToGroup);
router.delete("/chat/:groupId/:userId", removeUserFromGroup);
router.delete("/chat/group/leave/:groupId", leaveGroup);
router.patch("/chat/:groupId/:userId", changeUserRole);
router.delete("/chat/group/:groupId", deleteGroup);
router.post("/chat/group/:groupId", sendGroupMessages);
router.get("/chat/group/:groupId", getGroupMessages);
export default router;
//# sourceMappingURL=chatRoutes.js.map