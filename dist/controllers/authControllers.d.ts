import type { Request, Response } from "express";
interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}
export declare const register: (req: Request<{}, {}, RegisterRequestBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refresh: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=authControllers.d.ts.map