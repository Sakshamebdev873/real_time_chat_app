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
    res.json({ msg : "User Registered Successfully......", user });
  } catch (error) {
    res.status(400).json({ error: "Username already taken" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where : { email } });
  if (!user) {
    return res.status(400).json({ error: "Invalid Email Id" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }
  res.json({ token: generateToken(user.id), user,msg:"User logged in Successfully...." });
};
export const logout = async(req:Request,res:Response) =>{
    try {
        const user = req?.userId
        if(!user){
            return res.status(400).json({msg:"Invalid Token"})
        }
        jwt.verify({user},process.env.JWT_SECRET as String,{exp})
    } catch (error) {
        
    }
}