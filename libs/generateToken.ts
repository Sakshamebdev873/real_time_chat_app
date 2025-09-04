import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const generateToken = async (userId: Number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};
export default generateToken