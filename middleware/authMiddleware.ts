import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = header.split(" ")[1] as string ;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user || user.accessToken !== token) {
      return res.status(401).json({ msg: "Token expired or invalid" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
