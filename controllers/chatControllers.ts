import { GroupRole, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import type { AuthRequest } from "../types/types.js";

import { publisher } from "../libs/redis.js";

const prisma = new PrismaClient();

export const getChat = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(400).json({ msg: "UserId not found" });

  const otherUserId = parseInt(req.params.userId as string);
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const senderId = req.userId;
  const receiverId = parseInt(req.params.userId as string);
  const { content } = req.body;
  try {
    if (!content || content.trim() === "") {
      return res.status(400).json({ msg: "Message cannot empty" });
    }
    const message = await prisma.message.create({
      data: { senderId: senderId as number, receiverId, content },
    });
   await publisher.publish(
  "chat-channel",
  JSON.stringify({
    type: "private",
    senderId,
    receiverId,
    content,
    messageId: message.id,
    createdAt: message.createdAt,
  })
);


    res.status(201).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to create message....." });
  }
};

export const getGroupMessages = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  try {
    const messages = await prisma.message.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json({ messages });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong", error });
  }
};
export const sendGroupMessages = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const senderId = parseInt(req.userId as string);
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
    await publisher.publish(
      "chat-channel",
      JSON.stringify({
        type: "group",
        groupId,
        senderId,
        content,
        messageId: message.id,
        createdAt: message.createdAt,
      })
    );
    res.status(200).json({ msg: "Success", message });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: "Something went Wrong", error });
  }
};

export const createGroup = async (req: AuthRequest, res: Response) => {
  const { name, description, memberIds } = req.body;
  const creatorId = req.userId!;
  const safeMemberIds: number[] = Array.isArray(memberIds) ? memberIds : [];
  try {
    const group = await prisma.group.create({
      data: {
        name,
        description,
        users: {
          create: [
            { userId: creatorId, role: GroupRole.ADMIN },
            ...safeMemberIds.map((id: number) => ({
              userId: id,
              role: GroupRole.MEMBER,
            })),
          ],
        },
      },
      include: { users: true },
    });
    res.status(201).json({ group: group });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong. Failed to create group" });
  }
};
export const deleteGroup = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const userId = req.userId!;
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete group" });
  }
};
// need fixing
export const deleteMessage = async (req: AuthRequest, res: Response) => {
  const messageId = parseInt(req.params.messageId as string);
  const userId = req.userId!;
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};
export const addUserToGroup = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const { userIdtoAdd } = req.body;
  const userId = req.userId!;
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user to group" });
  }
};
export const removeUserFromGroup = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const userId = req.userId!;
  const userIdtoRemove = parseInt(req.params.userId as string);
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove user" });
  }
};
export const leaveGroup = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const userId = req.userId!;
  try {
    await prisma.groupUser.deleteMany({ where: { groupId, userId } });
    res.status(200).json({ msg: "You left the group" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to leave group" });
  }
};
// memeber already member role need error handling
export const changeUserRole = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const userId = req.userId!;
  const targetUserId = parseInt(req.params.userId as string);
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to change role" });
  }
};
export const editMessage = async (req: AuthRequest, res: Response) => {
  const messageId = parseInt(req.params.messageId as string);
  const { content } = req.body;
  const userId = req.userId!;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to edit messages" });
  }
};
export const deleteGroupMessage = async (req: AuthRequest, res: Response) => {
  const groupId = parseInt(req.params.groupId as string);
  const userId = req.userId!;
  const messageId = parseInt(req.params.messageId as string);

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to delete the message" });
  }
};
export const getGroupMembers = async (groupId : number) : Promise<number[] >=>{
const members = await prisma.groupUser.findMany({
  where : {groupId},
  select : {userId : true}
})
return members.map((member) => member.userId)
}