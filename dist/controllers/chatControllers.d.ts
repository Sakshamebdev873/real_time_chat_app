import type { Request, Response } from "express";
import type { AuthRequest } from "../types/types.js";
export declare const getChat: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGroupMessages: (req: Request, res: Response) => Promise<void>;
export declare const sendGroupMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createGroup: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteGroup: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addUserToGroup: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeUserFromGroup: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const leaveGroup: (req: AuthRequest, res: Response) => Promise<void>;
export declare const changeUserRole: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGroupMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getGroupMembers: (groupId: number) => Promise<number[]>;
//# sourceMappingURL=chatControllers.d.ts.map