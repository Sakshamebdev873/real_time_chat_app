import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const authMiddleware = async (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ msg: "No token provided" });
    }
    // Put Bearer first before putting accesss token
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user || user.accessToken !== token) {
            return res.status(401).json({ msg: "Token expired or invalid" });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map