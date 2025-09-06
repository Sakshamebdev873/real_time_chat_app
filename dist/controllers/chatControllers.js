import { GroupRole, PrismaClient } from "@prisma/client";
import { publisher } from "../libs/redis.js";
const prisma = new PrismaClient();
export const getChat = async (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(400).json({ msg: "UserId not found" });
    const otherUserId = parseInt(req.params.userId);
    if (isNaN(otherUserId))
        return res.status(400).json({ msg: "Invalid userId" });
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: "asc" },
        });
        if (messages.length === 0) {
            return res.status(400).json({ msg: "No messages found....." });
        }
        res.status(200).json({ msg: messages });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
};
export const sendMessage = async (req, res) => {
    const senderId = req.userId;
    const receiverId = parseInt(req.params.userId);
    const { content } = req.body;
    try {
        if (!content || content.trim() === "") {
            return res.status(400).json({ msg: "Message cannot empty" });
        }
        const message = await prisma.message.create({
            data: { senderId: senderId, receiverId, content },
        });
        await publisher.publish("chat-channel", JSON.stringify({
            senderId,
            receiverId,
            content,
            messageId: message.id,
        }));
        res.status(201).json({ message });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to create message....." });
    }
};
export const getGroupMessages = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    try {
        const messages = await prisma.message.findMany({
            where: { groupId },
            orderBy: { createdAt: "asc" },
        });
        res.status(200).json({ messages });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong", error });
    }
};
export const sendGroupMessages = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const senderId = parseInt(req.userId);
    const { content } = req.body;
    if (!content || content.trim() === "") {
        return res.status(400).json({ msg: "Message cannot be empty" });
    }
    try {
        const memberShip = await prisma.groupUser.findUnique({
            where: {
                userId_groupId: {
                    userId: senderId,
                    groupId,
                },
            },
        });
        if (!memberShip) {
            return res.status(403).json({ error: "Not a member" });
        }
        const message = await prisma.message.create({
            data: {
                senderId,
                groupId,
                content,
            },
        });
        res.status(200).json({ msg: "Success", message });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went Wrong", error });
    }
};
export const createGroup = async (req, res) => {
    const { name, description, memberIds } = req.body;
    const creatorId = req.userId;
    const safeMemberIds = Array.isArray(memberIds) ? memberIds : [];
    try {
        const group = await prisma.group.create({
            data: {
                name,
                description,
                users: {
                    create: [
                        { userId: creatorId, role: GroupRole.ADMIN },
                        ...safeMemberIds.map((id) => ({
                            userId: id,
                            role: GroupRole.MEMBER,
                        })),
                    ],
                },
            },
            include: { users: true },
        });
        res.status(201).json({ group: group });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msg: "Something went wrong. Failed to create group" });
    }
};
export const deleteGroup = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;
    try {
        const memberShip = await prisma.groupUser.findFirst({
            where: { groupId, userId },
        });
        if (!memberShip || memberShip.role !== "ADMIN") {
            return res.status(403).json({ error: "Only admins can delete groups" });
        }
        await prisma.group.update({
            where: { id: groupId },
            data: { isDeleted: true },
        });
        res.status(200).json({ msg: "Group deleted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete group" });
    }
};
// need fixing
export const deleteMessage = async (req, res) => {
    const messageId = parseInt(req.params.messageId);
    const userId = req.userId;
    try {
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        await prisma.message.update({
            where: { id: messageId },
            data: { isDeleted: true },
        });
        res.status(200).json({ msg: "Message" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete message" });
    }
};
export const addUserToGroup = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const { userIdtoAdd } = req.body;
    const userId = req.userId;
    try {
        const memberShip = await prisma.groupUser.findFirst({
            where: { groupId, userId },
        });
        if (!memberShip || memberShip.role !== "ADMIN") {
            return res.status(403).json({ error: "Only admins can add members" });
        }
        const newMember = await prisma.groupUser.create({
            data: { groupId, userId: userIdtoAdd, role: "MEMBER" },
        });
        res.status(201).json({ newMember });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add user to group" });
    }
};
export const removeUserFromGroup = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;
    const userIdtoRemove = parseInt(req.params.userId);
    try {
        const memberShip = await prisma.groupUser.findFirst({
            where: { groupId, userId },
        });
        if (!memberShip || memberShip.role !== "ADMIN") {
            return res.status(403).json({ error: "Only admins can remove members" });
        }
        await prisma.groupUser.deleteMany({
            where: { groupId, userId: userIdtoRemove },
        });
        res.status(200).json({ msg: "User removed from group" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove user" });
    }
};
export const leaveGroup = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;
    try {
        await prisma.groupUser.deleteMany({ where: { groupId, userId } });
        res.status(200).json({ msg: "You left the group" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to leave group" });
    }
};
// memeber already member role need error handling
export const changeUserRole = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;
    const targetUserId = parseInt(req.params.userId);
    const { role } = req.body;
    try {
        if (targetUserId === userId) {
            return res
                .status(400)
                .json({ msg: "Admin can change other's role not itself..." });
        }
        const memberShip = await prisma.groupUser.findFirst({
            where: { groupId, userId },
        });
        if (!memberShip || memberShip.role !== "ADMIN") {
            return res.status(403).json({ error: "Only admins can change roles" });
        }
        const updated = await prisma.groupUser.updateMany({
            where: { groupId, userId: targetUserId },
            data: { role },
        });
        res.status(200).json({ msg: "User role updated", updated });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to change role" });
    }
};
export const editMessage = async (req, res) => {
    const messageId = parseInt(req.params.messageId);
    const { content } = req.body;
    const userId = req.userId;
    try {
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        if (message.senderId !== userId) {
            return res
                .status(403)
                .json({ error: "Not allowed to edit this message" });
        }
        const updated = await prisma.message.update({
            where: { id: messageId },
            data: { content, updatedAt: new Date() },
        });
        res.status(200).json({ msg: "Message Updated", updated });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to edit messages" });
    }
};
export const deleteGroupMessage = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;
    const messageId = parseInt(req.params.messageId);
    try {
        // 1. Check if group exists
        const group = await prisma.group.findUnique({
            where: { id: groupId },
        });
        if (!group) {
            return res.status(400).json({ msg: "Invalid GroupId" });
        }
        // 2. Check if group is deleted
        if (group.isDeleted) {
            return res
                .status(403)
                .json({ msg: "You cannot delete messages from a deleted group" });
        }
        // 3. Check if the message exists and belongs to this group
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message || message.groupId !== groupId) {
            return res.status(404).json({ msg: "Message not found in this group" });
        }
        // 4. Authorization: Allow delete only if user is message sender or group admin
        const groupUser = await prisma.groupUser.findFirst({
            where: { groupId, userId },
        });
        const isAdmin = groupUser?.role === "ADMIN";
        const isMessageOwner = message.senderId === userId;
        if (!isAdmin && !isMessageOwner) {
            return res
                .status(403)
                .json({ msg: "You are not authorized to delete this message" });
        }
        // 5. Soft delete message
        await prisma.message.update({
            where: { id: messageId },
            data: { isDeleted: true },
        });
        return res.status(200).json({ msg: "Group message deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to delete the message" });
    }
};
//# sourceMappingURL=chatControllers.js.map