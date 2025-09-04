import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client.js";
import type { Request, Response } from "express";
import generateToken from "../libs/generateToken.js";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username,email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, email ,password: hashed },
    });
    res.json({ token: generateToken(user.id), user });
  } catch (error) {
    res.status(400).json({ error: "Username already taken" });
  }
};
export const login = async (req: Request, res: Response) => {

};
