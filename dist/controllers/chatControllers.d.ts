import type { Request, Response } from "express";
import type { AuthRequest } from "../types/types.js";
export declare const getChat: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGroupMessages: (req: Request, res: Response) => Promise<void>;
export declare const sendGroupMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=chatControllers.d.ts.map