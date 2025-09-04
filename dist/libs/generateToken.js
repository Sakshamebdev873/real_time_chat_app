// libs/generateToken.ts
import jwt from "jsonwebtoken";
export default function generateToken(userId, type) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET is not defined");
    const payload = { userId, type };
    // Set expiry inline to avoid SignOptions type issues
    const token = jwt.sign(payload, secret, type === "access"
        ? { expiresIn: "15m" } // short-lived
        : { expiresIn: "7d" } // long-lived
    );
    return token;
}
//# sourceMappingURL=generateToken.js.map