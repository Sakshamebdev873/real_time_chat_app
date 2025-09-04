import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import type { AuthRequest } from "../types/types.js";

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
  res.status(200).json({msg : messages})
 } catch (error : any) {
  console.log(error);
  res.status(500).json({msg : "Something went wrong"})
 }
};


export const sendMessage = async (req: Request, res: Response) => {
  const senderId = req.userId;
  const receiverId = parseInt(req.params.userId as string);
  const { content } = req.body;
  if (!content || content.trim() === "") {
    return res.status(400).json({ msg: "Message cannot empty" });
  }
  const message = await prisma.message.create({
    data: { senderId: senderId as number, receiverId, content },
  });
  res.status(201).json({ message });
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: "Something went Wrong", error });
  }
};
