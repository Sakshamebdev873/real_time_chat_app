import { Router } from "express";
import { addUserToGroup, changeUserRole, createGroup, deleteGroup, deleteMessage, editMessage, getChat, getGroupMessages, leaveGroup, removeUserFromGroup, sendGroupMessages, sendMessage, } from "../controllers/chatControllers.js";
const router = Router();
router.get("/chat/show/:userId", getChat);
router.post("/chat/create/:userId", sendMessage);
router.delete("/chat/delete/:messageId", deleteMessage);
router.patch("/chat/edit/:messageId", editMessage);
router.post("/chat/group/create", createGroup);
router.post("/chat/group/add/:groupId", addUserToGroup);
router.delete("/chat/group/remove/:groupId/:userId", removeUserFromGroup);
router.delete("/chat/group/leave/:groupId", leaveGroup);
router.patch("/chat/group/change/:groupId/:userId", changeUserRole);
router.delete("/chat/group/delete/:groupId", deleteGroup);
router.post("/chat/group/send/:groupId", sendGroupMessages);
router.get("/chat/group/show/:groupId", getGroupMessages);
export default router;
//# sourceMappingURL=chatRoutes.js.map