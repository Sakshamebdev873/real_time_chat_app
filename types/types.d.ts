// types.d.ts
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number | string;
  }
}
export interface AuthRequest extends Request {
  userId?: number; // added by auth middleware
}
