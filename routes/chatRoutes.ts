import { Router } from "express";
import {
  addUserToGroup,
  changeUserRole,
  createGroup,
  deleteGroup,
  deleteMessage,
  editMessage,
  getChat,
  getGroupMessages,
  leaveGroup,
  removeUserFromGroup,
  sendGroupMessages,
  sendMessage,
} from "../controllers/chatControllers.js";

const router = Router();
router.get("/chat/show/:userId", getChat as any);
router.post("/chat/create/:userId", sendMessage);
router.delete("/chat/delete/:messageId", deleteMessage as any);
router.patch("/chat/edit/:messageId", editMessage as any);

router.post("/chat/group/create", createGroup as any);
router.post("/chat/group/add/:groupId", addUserToGroup as any);
router.delete("/chat/group/remove/:groupId/:userId", removeUserFromGroup as any);
router.delete("/chat/group/leave/:groupId", leaveGroup as any);
router.patch("/chat/group/change/:groupId/:userId", changeUserRole as any);
router.delete("/chat/group/delete/:groupId", deleteGroup as any);
router.post("/chat/group/send/:groupId", sendGroupMessages);
router.get("/chat/group/show/:groupId", getGroupMessages);

export default router;
