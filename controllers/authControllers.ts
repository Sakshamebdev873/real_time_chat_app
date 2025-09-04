// controllers/authController.ts
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import generateToken from "../libs/generateToken.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// ------------------ REGISTER ------------------
interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (typeof password !== "string") {
    return res.status(400).json({ error: "Password must be a string" });
  }
  try {
    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.json({
      msg: "User Registered Successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Username or Email already taken" });
    }
    console.log(error);

    res.status(500).json({ msg: "Something went wrong", error });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  if (typeof password !== "string") {
    return res.status(400).json({ error: "password must be string" });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid Email Id" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid Credentials" });

  const accessToken = generateToken(user.id, "access");
  const refreshToken = generateToken(user.id, "refresh");

  // Store tokens in DB
  await prisma.user.update({
    where: { id: user.id },
    data: { accessToken, refreshToken },
  });

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    msg: "User logged in successfully",
  });
};

// ------------------ LOGOUT ------------------
export const logout = async (req: Request, res: Response) => {
  const { userId } = req.body; // provide userId in request body for logout

  if (!userId) return res.status(400).json({ msg: "Invalid user" });
  if (typeof userId !== "number") {
    return res.status(400).json({ msg: "user id must be number..." });
  }
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { accessToken: null, refreshToken: null },
    });

    res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// ------------------ REFRESH TOKEN ------------------
export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ msg: "No refresh token provided" });
  if (typeof refreshToken !== "string") {
    return res.status(400).json({ msg: "refresh token must be string..." });
  }
  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    );

    if (decoded.type !== "refresh") {
      return res.status(403).json({ msg: "Invalid token type" });
    }

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
