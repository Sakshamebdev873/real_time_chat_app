import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client.js";
import type { Request, Response } from "express";
import generateToken from "../libs/generateToken.js";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, email, password: hashed },
    });
    res.json({ msg: "User Registered Successfully......", user });
  } catch (error) {
    res.status(400).json({ error: "Username already taken" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "Invalid Email Id" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }
  const accessToken = generateToken(user.id, "access");
  const refreshToken = generateToken(user.id, "refresh");
  await prisma.user.update({
    where: { id: user.id },
    data: { accessToken, refreshToken },
  });
  res.json({
    accessToken,
    refreshToken,
    user,
    msg: "User logged in Successfully....",
  });
};
export const logout = async (req: Request, res: Response) => {
  try {
    const user = req?.userId;
    if (!user) {
      return res.status(400).json({ msg: "Invalid Token" });
    }
    await prisma.user.update({
      where: { id: user },
      data: { accesstoken: null, refreshToken: null },
    });
    res.status(201).json({ msg: "User Logged Out...." });
  } catch (error) {}
};
export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ msg: "No refresh token provided" });

  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    );

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Refresh token invalid or expired" });
    }

    // Generate new access token
    const newAccessToken = generateToken(user.id, "access");

    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: newAccessToken },
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ msg: "Refresh token expired" });
  }
};
