import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getChat = async (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(400).json({ msg: "UserId not found" });
    const otherUserId = parseInt(req.params.userId);
    if (isNaN(otherUserId))
        return res.status(400).json({ msg: "Invalid userId" });
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
};
export const sendMessage = async (req, res) => {
    const senderId = req.userId;
    const receiverId = parseInt(req.params.userId);
    const { content } = req.body;
    if (!content || content.trim() === "") {
        return res.status(400).json({ msg: "Message cannot empty" });
    }
    const message = await prisma.message.create({
        data: { senderId: senderId, receiverId, content },
    });
    res.status(201).json({ message });
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
//# sourceMappingURL=chatControllers.js.map